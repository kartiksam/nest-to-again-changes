import { Controller, Delete, Get, Param, Post, Body, UseInterceptors, UploadedFile, Patch, Res, UseGuards, Req, Put } from "@nestjs/common";
import { UserDetailsService } from "../services/user-details.services";
import { ProfileDto } from "../dto/create-profile-dto";
import { ResponseProfileDto } from "../dto/Response-dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { v4 as uuidv4 } from 'uuid';
import { join } from "path";
import * as path from 'path';

import { Response } from 'express';

import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation } from "@nestjs/swagger";
import { KartikAuth } from "src/modules/auth/auth";


@Controller('Profile')
export class UserDetailsController {

    constructor(private readonly userService: UserDetailsService) { }

    @UseGuards(KartikAuth)
    @ApiBearerAuth()
    @Post("/create")
    createProfile(@Body() dto: ProfileDto, @Req() req: Request): Promise<ResponseProfileDto> {
        return this.userService.createProfile(dto, req);
    }



    @ApiOperation({ summary: 'Get all profiles' })
    @UseGuards(KartikAuth)
    @ApiBearerAuth()
    @Get("/get")
    getAllData() {
        return this.userService.getAllData();
    }



    @UseGuards(KartikAuth)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get profile image for a user' })
    @Get("profile-image/:imagename")
    findProfileImage(@Param('imagename') imagename: string, @Res() res: Response) {
        const imagePath = join(process.cwd(), 'avatars', imagename);
        return res.sendFile(imagePath);
    }



    @UseGuards(KartikAuth)
    @ApiBearerAuth()
    @Patch('upload-image')
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
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Upload profile image',
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @ApiOperation({ summary: 'Upload profile image for a user' })
    async uploadFile(@Req() req: Request,
        @UploadedFile() file: Express.Multer.File): Promise<{ message: string }> {
        // uploaded file comes here 
        return await this.userService.uploadImage(req, file);

    }


    @UseGuards(KartikAuth)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get profile by userId' })
    @Get("/:id")
    getProfileByProfileId(@Param('id') id: string): Promise<ResponseProfileDto> {
        return this.userService.getDataById(id);
    }



    @UseGuards(KartikAuth)
    @ApiBearerAuth()
    @Delete("/:id")
    async deleteProfileById(@Param('id') id: string): Promise<string> {
        return await this.userService.deleteByID(id);
    }


}



