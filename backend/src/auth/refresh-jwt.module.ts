import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { REFRESH_JWT_EXPIRATION_TIME, REFRESH_JWT_SECRET_KEY } from "src/env";

export const RefreshJwtService = 'RefreshJwtService'

@Module({
    imports: [JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: (config: ConfigService) => {
            return {
                secret: config.get<string>(REFRESH_JWT_SECRET_KEY),
                signOptions: {
                    expiresIn: config.get<string | number>(REFRESH_JWT_EXPIRATION_TIME)
                }
            };
        },
        inject: [ConfigService]
    })],
    providers: [{
      provide: RefreshJwtService,
      useExisting: JwtService,
    }],
    exports: [RefreshJwtService],
  })
export class RefreshJwtModule {}