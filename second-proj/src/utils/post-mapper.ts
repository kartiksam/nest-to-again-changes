import { ResponsePostDto } from "src/modules/posts/dto/response-dto";
import { ResponseProfileDto } from "src/modules/user-details/dto/Response-dto";

export function toResponsePostDto(post: any): ResponsePostDto {
    return {
        title: post.title,
        createdBy: post.createdBy
    }

}