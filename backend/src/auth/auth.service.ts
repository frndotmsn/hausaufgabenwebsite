import { Inject, Injectable, Res } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { User } from '../models/user';
import { JwtService } from '@nestjs/jwt'
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { ACCESS_JWT_COOKIE } from 'src/env';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private readonly configService: ConfigService,
        @Inject('AccessJwtService') private accessJwtService: JwtService,
        @Inject('RefreshJwtService') private readonly refreshJwtService: JwtService) {}

    async validateUser(name: string, password: string): Promise<User | null> {
        const user = await this.usersService.getUserByName(name);
        return user && await bcrypt.compare(password, user.hashedPassword) ? user : null;
    }

    async login(response: Response, user: User) {
        const payload = { id: user.id };
        const [accessToken, refreshToken] = await Promise.all([ this.accessJwtService.signAsync(payload), (async() => this.refreshJwtService.signAsync({ payloadHash: await bcrypt.hash(JSON.stringify(payload), 10) }))()]);
        response.cookie(this.configService.getOrThrow<string>(ACCESS_JWT_COOKIE), accessToken, { httpOnly: true });
        return { success: true, data: refreshToken };
    }
}
