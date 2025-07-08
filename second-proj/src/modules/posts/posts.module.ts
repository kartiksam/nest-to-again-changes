import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Posts, PostsSchema } from 'src/schema/post-user';
import { PostController } from './controller/post-controller';
import { PostService } from './services/post-services';
import { AuthModule } from '../auth/auth.module';
import { ActivityModule } from '../activity/activity.module';

@Module({

    imports: [MongooseModule.forFeature([{ name: Posts.name, schema: PostsSchema }]),
        forwardRef(() => AuthModule), forwardRef(() => ActivityModule)],
    controllers: [PostController],
    providers: [PostService],
})
export class PostsModule { }
