import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { ResponseUserDto } from "../dto/Response-user-dto";
import { InjectModel } from "@nestjs/mongoose";
import { UserDocument, User } from "../../../schema/user.Schema";
import { Model } from "mongoose";
import { toResponseDto } from "../../../utils/user-mapper";
import { RegisterDto } from "src/modules/auth/dto/registerDto";

@Injectable()
export class UserService {


    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async create(dto: RegisterDto): Promise<ResponseUserDto> {
        const { name, email, password, role } = dto;

        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
            throw new ConflictException('User already exists');
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = new this.userModel({
            name,
            email, password: hashedPassword, role

        });
        await user.save();
        return toResponseDto(user);
    }


    async getData(): Promise<ResponseUserDto[]> {
        const users = this.userModel.find().exec();
        return (await users).map(user => toResponseDto(user));
    }


    async getDataById(id: string): Promise<ResponseUserDto> {
        const user = await this.userModel.findById(id).exec();
        if (!user) {
            throw new NotFoundException("No user found with this given id");
        }
        return toResponseDto(user);
    }

    async deleteById(id: string) {
        return await this.userModel.findOneAndDelete({ _id: id });
    }


    async findByEmail(email: string) {
        return await this.userModel.findOne({ email: email });
    }
}


