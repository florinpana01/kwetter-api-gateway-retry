
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private client: ClientProxy,
    private jwtService: JwtService,
    ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const res = await this.client.send('request_by_condition', {username})
    const user = await res.toPromise();
    console.log("user in auth service", user);
    
    if (user && await bcrypt.compare(pass, user.password) ) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
