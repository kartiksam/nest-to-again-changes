import { ResponseCommentDto } from "src/modules/comments/dtos/Response-dto";

export function toResponseCommentDto(comment: any): ResponseCommentDto {
    return {
        _id: comment._id,
        messsage: comment.message,
        createdBy: comment.createdBy

    }

}