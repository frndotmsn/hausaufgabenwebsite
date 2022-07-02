import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { ClientMiddleware } from './client.middleware';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [ClientService],
  controllers: [ClientController]
})
export class ClientModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ClientMiddleware)
      .forRoutes(ClientController);
  }
}