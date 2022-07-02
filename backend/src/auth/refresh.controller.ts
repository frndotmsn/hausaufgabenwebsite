import { Controller, Inject, Post, Req, Res, UseFilters, UseGuards } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request, Response, response } from "express";
import { ACCESS_JWT_COOKIE } from "src/env";
import { User } from "src/models/user";
import { UsersService } from "src/users/users.service";
import { AccessJwtService } from "./access-jwt.module";
import { RefreshJwtAuthGuard } from "./refresh-jwt-auth.guard";
import { ViewAuthFilterHelper } from "./view-auth.filter.helper";

@Controller()
export class RefreshController {
    constructor(
        private readonly configService: ConfigService,
        @Inject(AccessJwtService) private readonly accessJwtService: JwtService) {}
    
    @Post('refresh')
    @UseGuards(RefreshJwtAuthGuard)
    @UseFilters(ViewAuthFilterHelper())
    async refresh(@Req() req: { user: User }, @Res({ passthrough: true }) response: Response) {
        const payload = { id: req.user.id };
        const accessToken = await this.accessJwtService.signAsync(payload);
        response.cookie(this.configService.getOrThrow<string>(ACCESS_JWT_COOKIE), accessToken, { httpOnly: true });
        return { success: true };
    }
}