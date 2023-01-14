import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowController } from './follow.controller';
import { Follow } from './follow.entity';
import { FollowService } from './follow.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Follow]),
    ClientsModule.register([
      {
        name: 'FOLLOW_SERVICE',
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
  controllers: [FollowController],
  providers: [FollowService]
})
export class FollowModule { }
