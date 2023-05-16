import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BookmarkModule } from './bookmark/bookmark.module';
import { AuthModule } from './auth/auth.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';

@Module({
  imports:[
    AuthModule,
    UserModule,
    ConfigModule.forRoot({
    isGlobal:true,
  })
  ],
  controllers: [UserController],

})
export class AppModule {}
