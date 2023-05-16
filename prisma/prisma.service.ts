import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import {ConfigService} from '@nestjs/config'

@Injectable()
export class PrismaService extends PrismaClient  {
  constructor(config:ConfigService){
    super({
      datasources:{
        db:{
          url:config.get('DATABASE_URL')
        }
      }

    })

}
cleanDb(){//this function used to clean the database but without migrate
  return this.$transaction([
    this.bookMark.deleteMany(),
   this.user.deleteMany()
  ])
   

}}

//  console.log(config) 
//  console.log(config.get('DATABASE_URL'))
// implements OnModuleInit
  //async onModuleInit() {
  //   await this.$connect();
  // }

  // async enableShutdownHooks(app: INestApplication) {
  //   this.$on('beforeExit', async () => {
  //     await app.close();
  //   });
  // }