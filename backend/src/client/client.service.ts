import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs'
import * as path from 'path'
import { CLIENT_BUILD_PATH } from 'src/env';

@Injectable()
export class ClientService {
    constructor(private readonly configService: ConfigService) {}

    public getApp() {
        const basePath = this.configService.getOrThrow(CLIENT_BUILD_PATH);
        const filePath = path.resolve(path.join('../', basePath, 'index.html'));
        return new Promise((resolve: (value: string) => void, reject: (reason?: unknown) => void) => {
            fs.readFile(filePath, 'utf-8',
            (err: NodeJS.ErrnoException, data: string) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }
}
