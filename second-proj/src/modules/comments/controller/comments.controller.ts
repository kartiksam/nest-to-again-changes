import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { CommentsService } from "../services/comments.services";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { createCommentsDto } from "../dtos/create-comment";
import { ResponseCommentDto } from "../dtos/Response-dto";
import { KartikAuth } from "src/modules/auth/auth";


@ApiTags('Comments')
@Controller('Comments')
export class CommentsController {

    constructor(private readonly commentService: CommentsService) { }


    @UseGuards(KartikAuth)
    @ApiBearerAuth()
    @Get("/get")
    getAllComments() {
        return this.commentService.getAllComments();
    }


    @UseGuards(KartikAuth)
    @ApiBearerAuth()
    @Post("/create")
    createComment(@Body() dto: createCommentsDto, @Req() req: Request): Promise<ResponseCommentDto> {
        return this.commentService.createComment(dto, req);
    }


    @UseGuards(KartikAuth)
    @ApiBearerAuth()
    @Get("/:id")
    async getCommentById(@Param('id') id: string): Promise<ResponseCommentDto> {
        return await this.commentService.getCommentById(id);
    }
}