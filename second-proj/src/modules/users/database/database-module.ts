import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports: [MongooseModule.forRoot('mongodb://localhost:27017/social-media')

    ],
})

export class DatabaseModule { }