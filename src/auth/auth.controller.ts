import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { UserService } from 'src/shared/user.service';
import { LoginDTO, UserDTO } from 'src/dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Payload } from 'src/types/payload';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}
  @Get('/')
  @UseGuards(AuthGuard('jwt'))
  tempAuth() {
    return { auth: 'works' };
  }
  @Post('/login')
  async login(@Body() data: LoginDTO) {
    const user = await this.userService.findByLogin(data);
    let payload : Payload = {
      username: user.username,
      seller: user.seller,
    };
    let token = this.authService.signPayload(payload);
    return {
      user,
      token,
    };
  }
  @Post('/register')
  async registerUser(@Body() data: UserDTO) {
    console.log(data);
    const user = await this.userService.createUser(data);
    const payload = {
      username: user.username,
      seller: user.seller,
    };
    let token = this.authService.signPayload(payload);
    return {
      user,
      token,
    };
  }
}
