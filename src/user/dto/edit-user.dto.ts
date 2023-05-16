import { IsEmail, IsOptional, IsString,  } from "class-validator"

 export class EditUserDto{
    @IsEmail()
    @IsOptional()
    email?:string

   //  @IsString()
   //  @IsOptional()
   //  password?:String

    @IsString()
    @IsOptional()
    firstName?:string

    @IsString()
    @IsOptional()
    lastName ?:string
 }