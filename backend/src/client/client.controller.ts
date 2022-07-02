import { Controller, Get } from '@nestjs/common';
import { ClientService } from './client.service';

@Controller()
export class ClientController {
    constructor(private readonly clientService: ClientService) {}
    @Get('*')
    public get() {
        return this.clientService.getApp();
    }
}