import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LikeService } from './like.service';

@Controller('likes')
export class LikeController {
    constructor(private likeService: LikeService,
        @Inject('LIKE_SERVICE') private likeClient: ClientProxy) {
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async all() {
        const result = this.likeClient.send("like_request_all", {});
        return result;
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(
        @Body('postId') postId: number,
        @Body('userId') userId: number,
    ) {
        console.log('postId: ', postId, " userId: ", userId);
        const result = this.likeClient.send('like_created_gateway', {postId, userId});
        return result;
    }
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async get(@Param('id') id: number) {
        const result = this.likeClient.send('like_request_single', {id})
        return result;
    }


    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: number) {
        const result = this.likeClient.send('like_deleted_gateway', id);
        return result;
    }
}
