import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
  HttpException,
  HttpStatus,
  ValidationPipe,
  HttpCode,
  UseGuards,
  Req,
  Header,
  Res
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserService } from './user.service';
import { IdDto } from '../utils/id.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request, Response } from 'express';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return await this.userService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(@Param(ValidationPipe) { id }: IdDto, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
    try {
      const tokens: { refreshToken: string } = req.cookies;
      const refreshToken = tokens.refreshToken
      const resp = await this.userService.getById(id, refreshToken);
      if (!resp) {
        res.status(204);
      } else {
        return resp;
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'The user with this id was not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param(ValidationPipe) { id }: IdDto) {
    try {
      await this.userService.delete(id)
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'The user with this id was not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Body(ValidationPipe) updateUserDto: UpdatePasswordDto,
    @Param(ValidationPipe) { id }: IdDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    try {
      const tokens: { refreshToken: string } = req.cookies;
      const refreshToken = tokens.refreshToken
      const response = await this.userService.update(id, updateUserDto, refreshToken);
      if (!response) {
        res.status(204);
      } else {
        return response
      }
    } catch (error) {
      if (error.message === 'The user with this id was not found') {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'The user with this id was not found',
          },
          HttpStatus.NOT_FOUND,
        );
      } else if (error.message === 'OldPassword is wrong')
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: 'OldPassword is wrong',
          },
          HttpStatus.FORBIDDEN,
        )
    }
  }
}
