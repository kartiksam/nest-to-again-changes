import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDetailsController } from './controller/user-details.controller';
import { UserDetailsService } from './services/user-details.services';
import { UserDetails, UserDetailsSchema } from 'src/schema/user-Details';
import { AuthModule } from '../auth/auth.module';
import { ActivityModule } from '../activity/activity.module';
import { UserModule } from '../users/user-modules';

@Module({

    imports: [MongooseModule.forFeature([{ name: UserDetails.name, schema: UserDetailsSchema }]), forwardRef(() => AuthModule), forwardRef(() => ActivityModule), forwardRef(() => UserModule)],
    controllers: [UserDetailsController],
    providers: [UserDetailsService],
})
export class UserDetailsModule { }
