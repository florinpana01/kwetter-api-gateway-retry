import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { rootCertificates } from 'tls';
import { LikeModule } from './like/like.module';
import { FollowModule } from './follow/follow.module';

@Module({
  imports: [ 
    TypeOrmModule.forRoot({
    type: 'mysql',
    // host: '127.0.0.1',
    host: 'localhost',
    port: 3306,
    // username: 'florinpana98',
    username: 'root',
    // password: 'totamealand',
    password: 'Totamealand1983',
    database: 'admin',
    autoLoadEntities: true,
    synchronize: true,
  }),
  UserModule,
  PostModule,
  LikeModule,
  FollowModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
