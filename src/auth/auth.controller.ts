import { Controller,Post,Get,Body ,Res,Req, HttpCode, HttpStatus} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  signup(@Body() dto:AuthDto){
    return this.authService.signup(dto)
  };
  @HttpCode(HttpStatus.OK)//to return ok to server when signned in succssfully
  @Post('signin')
  signin(@Body() dto:AuthDto, @Req() req, @Res() res){
   // const response: any = res;
    return this.authService.signin(dto,req,res)
  };
  @Get('signout')
  signout( @Req() req, @Res() res){
    return this.authService.signout(req,res)
  }
}
