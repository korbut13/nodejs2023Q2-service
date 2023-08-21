import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('/signup')
  async signup(
    @Body() userDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const data = await this.authService.signup(userDto);
      res.cookie('accessToken', data.accessToken, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.cookie('refreshToken', data.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return data.user;
    } catch (error) {
      console.log('SignupErorController', error);
    }
  }

  @Post('/login')
  async login(
    @Body() userDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const tokenData = await this.authService.login(userDto);
      res.cookie('accessToken', tokenData.accessToken, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.cookie('refreshToken', tokenData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return tokenData;
    } catch (error) {
      console.log('Loginerror', error);
    }
  }

  @Post('/refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const refreshToken = req.cookies;
      const tokenData = await this.authService.refresh(refreshToken);
      res.cookie('accessToken', tokenData.accessToken, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.cookie('refreshToken', tokenData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return tokenData;
    } catch (error) {
      console.log('refreshError', error);
    }
  }
}
