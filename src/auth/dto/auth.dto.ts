import { IsEmail,IsNotEmpty,IsString, Length } from 'class-validator'

export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
    public email:string

    @IsString()
    @IsNotEmpty()
    @Length(4,8,{message:'password must be in between 4-8 character'})
    public  password:string
}
 //@IsEmpty()->is updated
