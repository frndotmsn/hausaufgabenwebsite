import { Controller, Get, Post, UseGuards, UseFilters, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AccessJwtAuthGuard } from './auth/access-jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { ViewAuthFilterHelper } from './auth/view-auth.filter.helper';
import { Response } from 'express';
import { User } from './models/user';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService) {}
  
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req: { user: User }, @Res({ passthrough: true }) response: Response) {
    return this.authService.login(response, req.user);
  }
}
