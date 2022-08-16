import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { User } from '../models/user';
import { JwtService } from '@nestjs/jwt'
import { Response } from 'express';
import { ACCESS_JWT_COOKIE } from '../constants';
import { UserCreateInput } from 'src/users/gql/dto/input/user-create.input';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        @Inject('AccessJwtService') private accessJwtService: JwtService,
        @Inject('RefreshJwtService') private readonly refreshJwtService: JwtService) {}

    async validateUser(name: string, password: string): Promise<User | null> {
        const user = await this.usersService.getUserByName(name);
        return user && await bcrypt.compare(password, user.hashedPassword) ? user : null;
    }

    async login(response: Response, user: User) {
        const payload = { id: user.id };
        const [accessToken, refreshToken] = await Promise.all([ this.accessJwtService.signAsync(payload), (async() => this.refreshJwtService.signAsync({ payloadHash: await bcrypt.hash(JSON.stringify(payload), 10) }))()]);
        response.cookie(ACCESS_JWT_COOKIE, accessToken, { httpOnly: true });
        return { success: true, data: refreshToken };
    }

    async signup(response: Response, userCreateInput: UserCreateInput) {
        try {
            const user = await this.usersService.createUser(userCreateInput);
            return this.login(response, user);
        } catch (error) {
            return { success: false, message: error.message };
        }
    }
}
