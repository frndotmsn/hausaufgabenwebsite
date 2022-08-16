import { Controller, Get, Post, UseGuards, Req, Res, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { Request, Response } from 'express';
import { User } from './models/user';
import { UserCreateInput } from './users/gql/dto/input/user-create.input';
import { ACCESS_JWT_COOKIE } from './constants';
import { INDEX_FILE } from './main';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService) {}
  
  @Get('/')
  serveIndex(@Res() response: Response)
  {
    response.sendFile(INDEX_FILE('index'));
  }

  @Get('login')
  serveLogin(@Req() request: Request, @Res() response: Response) {
    if (request.cookies[ACCESS_JWT_COOKIE]) response.redirect('/logout')
    else response.sendFile(INDEX_FILE('login'));
  }
  
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req: { user: User }, @Res({ passthrough: true }) response: Response) {
    return this.authService.login(response, req.user);
  }

  @Get('signup')
  serveSignup(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
    if (request.cookies[ACCESS_JWT_COOKIE]) response.redirect('/logout')
    else response.sendFile(INDEX_FILE('signup'));
  }

  @Post('signup')
  signup(@Body() body: UserCreateInput, @Res({ passthrough: true }) response: Response) {
    return this.authService.signup(response, body);
  }
}
