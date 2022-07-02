import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";
import * as path from 'path'
import { ConfigService } from "@nestjs/config";
import { CLIENT_BUILD_PATH } from "src/env";


@Injectable()
export class ClientMiddleware implements NestMiddleware {
    constructor(private readonly configService: ConfigService) {}
    getAssetPath(url: string) {
        const basePath = this.configService.getOrThrow<string>(CLIENT_BUILD_PATH);
        return path.join(basePath, url);
    }
    use(req: Request, res: Response, next: () => void) {
        if (/[^\\/]+\.[^\\/]+$/.test(req.path)) {
            const file = this.getAssetPath(req.path);
            res.sendFile(file, { root: path.join(__dirname, '../', '../', '../') }, (err: Error) => {
                if (err) res.status((err as unknown as { status: number }).status).end();
            });
        } else {
            console.log(req.path)
            return next();
        }
    }
}