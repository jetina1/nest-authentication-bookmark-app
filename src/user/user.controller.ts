import { Body, Controller, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@Controller('users')
@UseGuards(JwtGuard/*AuthGuard('jwt')or custome guard*/)//protects the whole page and exctract data from the header
export class UserController {
    constructor(private UserServise:UserService){}//importing userservice
    @Get('me')
    getme(
        @GetUser() user: User,
        @GetUser('email') email: string,
    ) 
    {
        console.log({ 'email': email })
        return user 
    }

    @Patch()
    editUser(
        @GetUser('id') userId:number,
        @Body() dto: EditUserDto) {
            return this.UserServise.editUser(userId,dto,);

    }

}
