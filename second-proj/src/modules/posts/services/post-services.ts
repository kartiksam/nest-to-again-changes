import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PostDocument, Posts } from "src/schema/post-user";
import { Model } from "mongoose";
import { CreatePostDto } from "../dto/create-post";
import { toResponsePostDto } from "src/utils/post-mapper";
import { ResponsePostDto } from "../dto/response-dto";
import { ActivityService } from "src/modules/activity/activity.service";
import { UpdateDto } from "../dto/update-dto";


@Injectable()
export class PostService {


    constructor(@InjectModel(Posts.name) private postModel: Model<PostDocument>, private readonly activityService: ActivityService) { }

    async createPost(dto: CreatePostDto, req: Request, file?: Express.Multer.File,): Promise<ResponsePostDto> {
        const { title, description, likesCount } = dto;
        const userId = (req as any).user?.id;

        const post = new this.postModel({
            title, description, image: file?.filename, likesCount, createdBy: userId
        });
        await this.activityService.logActivity({ userId: userId, action: "Create", resource: "Post", description: "Creted a new post", payload: post })
        await post.save();
        return toResponsePostDto(post);
    }


    async getAllPosts(): Promise<ResponsePostDto[]> {
        const posts = this.postModel.find().exec();

        return (await posts).map(post => toResponsePostDto(post));
    }

    async updateUser(id: string, dto: UpdateDto) {
        const existingUser = await this.postModel.findById(id);

        if (!existingUser) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        // Apply updates
        Object.assign(existingUser, dto);

        // Save the changes
        const updatedUser = await existingUser.save();

        return {
            message: 'User updated successfully',
            data: updatedUser,
        };
    }




    async getDataById(id: string): Promise<ResponsePostDto> {
        const post = this.postModel.findById(id).exec();
        if (!post) {
            throw new NotFoundException("Not exists with given id");
        }
        return await toResponsePostDto(post);
    }


    async deleteById(id: string): Promise<string> {
        await this.postModel.findOneAndDelete({ _id: id }).exec();
        return `Given provided id ${id} is deleted succesfully`;
    }


}