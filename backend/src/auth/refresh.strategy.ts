import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-custom'
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { User } from 'src/models/user';
import { ACCESS_JWT_COOKIE } from 'src/env';


@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
    static key = 'refresh-jwt'
    constructor(
        private usersService: UsersService,
        private readonly configService: ConfigService,
        @Inject('AccessJwtService') private accessJwtService: JwtService,
        @Inject('RefreshJwtService') private readonly refreshJwtService: JwtService) { super() }

    async validate(request: Request): Promise<User | null> {
        const accessToken = request?.cookies[this.configService.getOrThrow<string>(ACCESS_JWT_COOKIE)];
        if (!accessToken) throw new UnauthorizedException('credentials_incomplete', 'Missing access token')
        if (!request.headers?.authorization) throw new UnauthorizedException('credentials_bad_scheme', 'Format is Authorization: Bearer [token]')
        const parts = request.headers.authorization.split(' ');
        if (parts.length != 2) throw new UnauthorizedException('credentials_bad_scheme', 'Format is Authorization: Bearer [token]')
        const [scheme, refreshToken] = parts
        if (!/^Bearer$/i.test(scheme)) throw new UnauthorizedException('credentials_bad_scheme', 'Format is Authorization: Bearer [token]')
        const [{ iat: _0, exp: _1, ...accessPayload}, { iat: _2, exp: _3, payloadHash, ..._4}]
        : [{ iat: number, exp: number, id: string }, { iat: number, exp: number, payloadHash: string }]
        = await Promise.all([this.accessJwtService.verifyAsync(accessToken, { ignoreExpiration: true }), this.refreshJwtService.verifyAsync(refreshToken)]);
        if (!await bcrypt.compare(JSON.stringify(accessPayload), payloadHash)) throw new UnauthorizedException('credentials_unmatching_tokens', "The access and refresh tokens don't match")
        const user = await this.usersService.getUser(accessPayload.id)
        if (!user) throw new UnauthorizedException('credentials_nonexistent_user', "The user doesn't exist")
        if (user.shouldReauth) throw new UnauthorizedException('credentials_revoked', 'You should reauthenticate')
        return user;
    }
}