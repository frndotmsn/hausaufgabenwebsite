import { Module } from "@nestjs/common";
import { UsersModule } from "src/users/users.module";
import { AccessJwtModule } from "./access-jwt.module";
import { RefreshJwtModule } from "./refresh-jwt.module";
import { RefreshController } from "./refresh.controller";
import { RefreshStrategy } from "./refresh.strategy";

@Module({
    imports: [
        RefreshJwtModule,
        UsersModule,
        AccessJwtModule
    ],
    providers: [RefreshStrategy],
    controllers: [RefreshController],
    exports: [RefreshStrategy]
})
export class RefreshModule {}