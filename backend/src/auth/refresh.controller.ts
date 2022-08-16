import { Controller, Inject, Post, Req, Res, UseFilters, UseGuards } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import { ACCESS_JWT_COOKIE } from '../constants';
import { User } from "src/models/user";
import { AccessJwtService } from "./access-jwt.module";
import { RefreshJwtAuthGuard } from "./refresh-jwt-auth.guard";
import { ViewAuthFilterHelper } from "./view-auth.filter.helper";

@Controller()
export class RefreshController {
    constructor(
        @Inject(AccessJwtService) private readonly accessJwtService: JwtService) {}
    
    @Post('refresh')
    @UseGuards(RefreshJwtAuthGuard)
    @UseFilters(ViewAuthFilterHelper())
    async refresh(@Req() req: { user: User }, @Res({ passthrough: true }) response: Response) {
        const payload = { id: req.user.id };
        const accessToken = await this.accessJwtService.signAsync(payload);
        response.cookie(ACCESS_JWT_COOKIE, accessToken, { httpOnly: true });
        return { success: true };
    }
}