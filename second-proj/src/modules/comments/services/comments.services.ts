import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Comments, CommentsDocument } from "src/schema/comments-user";
import { createCommentsDto } from "../dtos/create-comment";
import { ResponseCommentDto } from "../dtos/Response-dto";
import { toResponseCommentDto } from "src/utils/comments-mapper";
import { ActivityService } from "src/modules/activity/activity.service";

@Injectable()
export class CommentsService {

    constructor(@InjectModel(Comments.name) private commentModel: Model<CommentsDocument>, private activityService: ActivityService) { }

    async createComment(dto: createCommentsDto, req: Request): Promise<ResponseCommentDto> {
        const { message } = dto;
        const userId = (req as any).user?.id;
        const comment = new this.commentModel({
            message, createdBy: userId
        });
        await this.activityService.logActivity({
            userId: userId, action: "Create", resource: "Comment", description: "Creted a new comment"
        })
        await comment.save();
        return toResponseCommentDto(comment);
    }


    async getAllComments(): Promise<ResponseCommentDto[]> {
        const comments = this.commentModel.find().exec();
        return (await comments).map(comment => toResponseCommentDto(comment));
    }

    async getCommentById(id: string): Promise<ResponseCommentDto> {
        const comment = await this.commentModel.findById(id).exec();
        if (!comment) {
            throw new NotFoundException("comment not found with this given id");
        }
        return toResponseCommentDto(comment);

    }

}