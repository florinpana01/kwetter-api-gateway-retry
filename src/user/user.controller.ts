import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, Post, Put, Req, Res, UnauthorizedException } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { Response, Request } from 'express';

@Controller('users')
export class UserController {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        @Inject('USER_SERVICE') private client: ClientProxy
    ) {

    }

    @Get()
    async all() {
        const result = this.client.send('user_request_all', {});
        return result;
        //return this.userService.all();
    }

    @EventPattern('hello')
    async hello(data: string) {
        console.log(data);
    }

    @Post('register')
    async register(
        @Body('email') email: string,
        @Body('firstName') firstName: string,
        @Body('lastName') lastName: string,
        @Body('username') username: string,
        @Body('password') password: string
    ) {
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = this.client.send('user_created_gateway', { email, firstName, lastName, username, password })
        return result;
        //stopping the password from being displayed on the response, for security reasons
        // const user = await this.userService.create({
        //     email,
        //     firstName, 
        //     lastName,
        //     username,
        //     password: hashedPassword
        // });
        // this.client.emit("user_created_gateway",user)
        // delete user.password;
        // return user; 
    }

    @Post('login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string,
        @Res({ passthrough: true }) response: Response
    ) {
         const result = await this.client.send('user_login_gateway', { email });
         const user = await result.toPromise();
        // return await user;        
        // const user = await this.userService.findOne({email});

        if (!user) {
            throw new BadRequestException('invalid credentials');
        }

        if (!await bcrypt.compare(password, user.password)) {
            throw new BadRequestException('invalid credentials');
        }

        const jwt = await this.jwtService.signAsync({ id: user.id, username: user.username });

        response.cookie('jwt', jwt, { httpOnly: true });
        return {
            message: 'success'
        };
    }

    @Get('user')
    async user(@Req() request: Request) {
        console.log('we are here', request);

        try {
            const cookie = request.cookies['jwt'];
            const data = await this.jwtService.verifyAsync(cookie)
            return data;
        } catch (error) {
            throw new UnauthorizedException();
        }
    }

    @Post('logout')
    async logout(@Res({ passthrough: true }) response: Response
    ) {
        response.clearCookie('jwt');
        return {
            message: 'logged out'
        }
    }
}
