import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "src/users/users.module";
import { AccessJwtModule } from "./access-jwt.module";
import { AccessJwtStrategy } from "./access.strategy";

@Module({
    imports: [
        UsersModule,
        ConfigModule,
        AccessJwtModule
    ],
    providers: [AccessJwtStrategy],
    exports: [AccessJwtStrategy]
})
export class AccessModule {}