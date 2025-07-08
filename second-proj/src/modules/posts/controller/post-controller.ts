/**
 Controller for posts
 */
import { Body, Controller, Delete, Get, Param, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { v4 as uuidv4 } from 'uuid';
import { ResponsePostDto } from "../dto/response-dto";
import { CreatePostDto } from "../dto/create-post";
import { PostService } from "../services/post-services";
import { FileInterceptor } from "@nestjs/platform-express/multer";
import { diskStorage } from "multer";
import * as path from "path";
import { KartikAuth } from "src/modules/auth/auth";
import { UpdateDto } from "../dto/update-dto";

@ApiTags('Posts')
@Controller('Posts')
export class PostController {

    constructor(private readonly postService: PostService) { }


    @UseGuards(KartikAuth)
    @ApiBearerAuth()
    @Post("/create")
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './avatars',
            filename: (req, file, cb) => {
                const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
                const extension: string = path.parse(file.originalname).ext;
                cb(null, `${filename}${extension}`);
            }
        })
    }
    ))
    @ApiOperation({ summary: 'Create a post with optional image and tags' })
    @ApiResponse({ status: 201, type: ResponsePostDto })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                title: { type: 'string' },
                description: { type: 'string' },
                likesCount: { type: 'number' },
                createdBy: { type: 'string' },
                file: {
                    type: 'string',
                    format: 'binary'
                }
            }
        }
    })
    createPost(@Body() dto: CreatePostDto, @UploadedFile() file: Express.Multer.File, @Req() req: Request): Promise<ResponsePostDto> {
        return this.postService.createPost(dto, req, file);

    }



    @UseGuards(KartikAuth)
    @ApiBearerAuth()
    @Get("/get")
    @ApiOperation({ summary: 'Get all posts' })
    @ApiResponse({ status: 200, description: 'Returns list of posts' })
    getAllPosts() {
        return this.postService.getAllPosts();
    }

    @UseGuards(KartikAuth)
    @ApiBearerAuth()
    @Put("/user/update/:id")
    async updateUserHandler(
        @Body() dto: UpdateDto,
        @Param('id') id: string
    ) {
        return this.postService.updateUser(id, dto);
    }





    @UseGuards(KartikAuth)
    @ApiBearerAuth()
    @Get("/:id")
    getDataById(@Param('id') id: string) {
        return this.postService.getDataById(id);

    }


    @UseGuards(KartikAuth)
    @ApiBearerAuth()
    @Delete("/:id")
    getDeleteById(@Param('id') id: string): Promise<string> {
        return this.postService.deleteById(id);
    }
}

