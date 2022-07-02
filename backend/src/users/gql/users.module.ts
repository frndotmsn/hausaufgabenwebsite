import { Module } from '@nestjs/common';
import { UsersGQLResolver } from './users.resolver';
import { UsersModule } from '../users.module';

@Module({
  imports: [UsersModule],
  providers: [UsersGQLResolver],
})
export class UsersGQLModule {}
