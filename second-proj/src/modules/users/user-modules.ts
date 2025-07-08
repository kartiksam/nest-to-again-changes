import { forwardRef, Module } from "@nestjs/common";
import { UserController } from "./controller/user.controller";
import { UserService } from "./services/user.service";
import { User, UserSchema } from "../../schema/user.Schema";


import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "../auth/auth.module";


@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),

        forwardRef(() => AuthModule)
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService, MongooseModule]
})

export class UserModule { }