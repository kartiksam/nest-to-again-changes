import { forwardRef, Module } from '@nestjs/common';
import { CommentsController } from './controller/comments.controller';
import { CommentsService } from './services/comments.services';
import { MongooseModule } from '@nestjs/mongoose';
import { Comments, CommentsSchema } from 'src/schema/comments-user';
import { AuthModule } from '../auth/auth.module';
import { ActivityModule } from '../activity/activity.module';

@Module({

    imports: [MongooseModule.forFeature([{ name: Comments.name, schema: CommentsSchema }]), forwardRef(() => AuthModule), forwardRef(() => ActivityModule)],
    controllers: [CommentsController],
    providers: [CommentsService]
})
export class CommentsModule { }
