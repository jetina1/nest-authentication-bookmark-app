import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import   cookieParser from 'cookie-parser';
//import fastifyCookie from '@fastify/cookie';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true
  }))
 
  await app.listen(3000);
}
bootstrap();


 // const app = await NestFactory.create<NestFastifyApplication>(
  //   AppModule,
  //   new FastifyAdapter(),
  // );
  // await app.register(fastifyCookie, {
  //   secret: 'my-secret', // for cookies signature
  // });    /*, { cors: {credentials: true, origin: process.env.CLIENT_URL} }*/