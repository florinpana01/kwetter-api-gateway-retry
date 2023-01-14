import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post.controller';
import { Post } from './post.entity';
import { PostService } from './post.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    ClientsModule.register([
      {
        name: 'POST_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqps://iygyoums:Ff8WVU7zxhJdki1R5sGzOPrUadHTzQjZ@kangaroo.rmq.cloudamqp.com/iygyoums'],
          queue: "post-queue-gateway",
          queueOptions: {
            durable: false
          },
        },
      },
      {
        name: 'TIMELINE_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqps://iygyoums:Ff8WVU7zxhJdki1R5sGzOPrUadHTzQjZ@kangaroo.rmq.cloudamqp.com/iygyoums'],
          queue: "post-queue",
          queueOptions: {
            durable: false
          },
        },
      }
    ]),
  ],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule { }
