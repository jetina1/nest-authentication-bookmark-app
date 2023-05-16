import { BadRequestException, ForbiddenException, Injectable,Res  } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Request,Response } from 'express';
import * as bcrypt from 'bcrypt';

import { PrismaService } from '../../prisma/prisma.service';
import { AuthDto } from './dto';
import { JwtService } from '@nestjs/jwt/dist';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {
    constructor(private Prisma:PrismaService,private jwt:JwtService,private config:ConfigService){}
    async signup( dto:AuthDto){//now we get the dto of the request bodyy
        const {email,password}=dto
        //console.log({ email:email, password:password})
        console.log(this.Prisma.user.count + 'user in database')
        //hash password
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);
       //create and save new user to db
       try{
        const user= await this.Prisma.user.create({data:{
        email,
        hash
    },

})
    const countUser = await this.Prisma.user.count()
    console.log(countUser)
    delete user.hash// =>stripping out  the hash from the userobject
//return the new user
  //return user ->pass the user to generate token
  return this.signToken(user)
}
  catch(error){
    if(error instanceof PrismaClientKnownRequestError){
        if(error.code =='P2002'){
            throw new ForbiddenException('Crediantial taken ,Try with another email');
        }
    }
    throw error;
  }
    }

    async signin(dto:AuthDto,req :Request,res:Response){
        const {email,password}=dto
        //find user by unique filed email
        const foundUser=await this.Prisma.user.findUnique({where:{email}})
        if(!foundUser){
            throw new BadRequestException ('Wrong crediantial')
       }
       //check password
       const isMatch=await this.comparepassword({
        password,
        hash:foundUser.hash});
      //if not equal stop
      if(!isMatch){
        throw new BadRequestException('Wrong crediantial check password')
      }
      //to return the token
      const token=await this.signToken({
        id:foundUser.id,
        email:foundUser.email
     });
        if(!token)
        {
            throw new ForbiddenException()
        } 
      res.cookie('token',token);
      res.send({access_token:token})
    //    return 'tokens :'+token
       
    }

    async signout( request: Request,response: Response){
         response.clearCookie('token')
        return response.send({
            msg:' signedout successfully '
        }) 
    }
    async comparepassword(args:{password:string,hash:string}){
       return  await bcrypt.compare(args.password,args.hash);
 
    }

     async signToken(args:{id:number,email:string}):Promise<string>{
        const PayLoad=args//short form of const payload={sub:id,email}
        const secret=this.config.get('JWT_SECRET')
         return this.jwt.signAsync(PayLoad,{secret:secret,expiresIn:'15m'})

    }
    
}







/*
    @Res({passthrough: true})=>signin()
    // select:{
    //     id:true,
    //     email:true,
    //     createdAt:true
    // }

            @Get()
// findAll(@Req() request: Request) {
//   console.log(request.cookies);

    //find by id
        const foundUserByName =await this.Prisma.user.findMany({where:{firstName}})
    if(foundUserByName){
        return {
            firstName:this.Prisma.user.firstName,
        }
    } 
    //  {
//     msg:'*****signup Successfully*****',
// }
        */
       
        