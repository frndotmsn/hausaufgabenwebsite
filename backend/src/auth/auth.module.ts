import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { AccessModule } from './access.module';
import { AccessJwtModule } from './access-jwt.module';
import { RefreshModule } from './refresh.module';
import { RefreshJwtModule } from './refresh-jwt.module';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        AccessModule,
        AccessJwtModule,
        RefreshModule,
        RefreshJwtModule
    ],
    providers: [AuthService, LocalStrategy],
    exports: [AuthService]
})
export class AuthModule {}
