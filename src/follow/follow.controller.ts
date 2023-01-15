import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { FollowService } from './follow.service';

@Controller('follows')
export class FollowController {
    constructor(private followService: FollowService,
        @Inject('FOLLOW_SERVICE') private followClient: ClientProxy) {
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async all() {
        const result = this.followClient.send("follow_request_all", {});
        return result;
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(
        @Body('followerId') followerId: number,
        @Body('followedId') followedId: number,
    ) {
        console.log('followerId: ', followerId, " followedId: ", followedId);
        const result = this.followClient.send('follow_created_gateway', {followerId, followedId});
        return result;
    }
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async get(@Param('id') id: number) {
        const result = this.followClient.send('follow_request_single', {id})
        return result;
    }


    @UseGuards(LocalAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: number) {
        const result = this.followClient.send('follow_deleted_gateway', id);
        return result;
    }
}
