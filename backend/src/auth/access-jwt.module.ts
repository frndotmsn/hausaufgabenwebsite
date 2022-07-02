import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { ACCESS_JWT_EXPIRATION_TIME, ACCESS_JWT_SECRET_KEY } from "src/env";

export const AccessJwtService = 'AccessJwtService'

@Module({
    imports: [JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: (config: ConfigService) => {
            return {
                secret: config.get<string>(ACCESS_JWT_SECRET_KEY),
                signOptions: {
                    expiresIn: config.get<string | number>(ACCESS_JWT_EXPIRATION_TIME)
                }
            };
        },
        inject: [ConfigService]
    })],
    providers: [{
      provide: AccessJwtService,
      useExisting: JwtService,
    }],
    exports: [AccessJwtService],
  })
  export class AccessJwtModule {}