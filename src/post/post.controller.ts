import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
    constructor(private postService: PostService,
        @Inject('POST_SERVICE') private postClient: ClientProxy,
        @Inject('TIMELINE_SERVICE') private timelineClient: ClientProxy) {
    }

    @Get()
    async all() {
        const result = this.timelineClient.send("post_request_all", {});
        return result;
    }

    @Post()
    async create(
        @Body('content') content: string,
        @Body('userId') userId: number,
    ) {
        const result = this.postClient.send('post_created_gateway', {content, userId});
        return result
    }
    @Get(':id')
    async get(@Param('id') id: number) {
        const result = this.timelineClient.send('post_request_single', {id})
        return result;
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body('content') content: string,
        @Body('userId') userId: string,
    ) {
        const result = this.postClient.send('post_updated_gateway', {id, content, userId});
        return result
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        const result = this.postClient.send('post_deleted_gateway', id);
        return result
    }
}
