import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserDetails, UserDetailsDocument } from "src/schema/user-Details";
import mongoose, { Model } from "mongoose";
import { ProfileDto } from "../dto/create-profile-dto";
import { ResponseProfileDto } from "../dto/Response-dto";
import { toResponseProfileDto } from "src/utils/Profile-mapper";
import { User, UserDocument } from "src/schema/user.Schema";

@Injectable()
export class UserDetailsService {

    constructor(@InjectModel(UserDetails.name) private profileModel: Model<UserDetailsDocument>, @InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async createProfile(dto: ProfileDto, req: Request): Promise<ResponseProfileDto> {
        const userId = (req as any).user?.id;
        console.log(userId);
        const { address, contactNumber } = dto;
        const profile = new this.profileModel({
            address, contactNumber

        });

        await profile.save();
        await this.userModel.findByIdAndUpdate(userId, {
            userDetails: profile._id,
        });

        return toResponseProfileDto(profile);
    }

    async getAllData(): Promise<ResponseProfileDto[]> {
        const profiles = this.profileModel.find().exec();
        return (await profiles).map(profile => toResponseProfileDto(profile));
    }

    async getDataById(id: string): Promise<ResponseProfileDto> {
        const profile = await this.profileModel.findById(id).exec();
        if (!profile) {
            throw new NotFoundException("No profile with this given id");
        }
        return toResponseProfileDto(profile);

    }

    async deleteByID(id: string): Promise<string> {
        await this.profileModel.findByIdAndDelete(id);
        return `Profile with provided id ${id} is deleted succesfully`;
    }




    async uploadImage(req: Request, file: Express.Multer.File): Promise<{ message: string }> {
        const userId = (req as any).user?.id;
        const user = await this.userModel.findById(userId).select('userDetails').exec();
        const userDetailId = user?.userDetails?.toString() || null;
        const imageUrl = `/uploads/${file.filename}`;
        await this.profileModel.findByIdAndUpdate(userDetailId, { image: imageUrl });
        return { message: "Profile uploaded succesfully" };
    }







}