import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../models/user";
import { UsersService } from "src/users/users.service";
import { Request } from "express";
import { ACCESS_JWT_COOKIE, ACCESS_JWT_SECRET_KEY } from "src/env";

@Injectable()
export class AccessJwtStrategy extends PassportStrategy(Strategy, 'access-jwt') {
    constructor(
        private readonly usersService: UsersService,
        private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
                const accessToken = request?.cookies[this.configService.getOrThrow<string>(ACCESS_JWT_COOKIE)];
                return accessToken;
            }]),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>(ACCESS_JWT_SECRET_KEY)
        });
    }

    async validate(payload: { id: number } | null): Promise<User | null> {
        if (!payload) throw new UnauthorizedException()
        return await this.usersService.getUser(payload.id);
    }
}