import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Type, UnauthorizedException } from "@nestjs/common";
import { Response } from "express";

@Catch(UnauthorizedException)
export class ViewAuthFilter implements ExceptionFilter<HttpException> {
    constructor(private readonly redirectTo: string = '/login') {}
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();
        response.redirect(status, this.redirectTo);
    }
}