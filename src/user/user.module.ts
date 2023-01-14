import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UserModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: {expiresIn: '1d'}
    }),
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqps://iygyoums:Ff8WVU7zxhJdki1R5sGzOPrUadHTzQjZ@kangaroo.rmq.cloudamqp.com/iygyoums'],
          queue: "user-queue-gateway",
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
