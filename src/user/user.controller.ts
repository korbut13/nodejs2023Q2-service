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
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserService } from './user.service';
import { IdDto } from '../utils/id.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async getAll() {
    return await this.userService.getAll();
  }

  @Get(':id')
  async getById(@Param(ValidationPipe) { id }: IdDto) {
    try {
      return await this.userService.getById(id);
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

  @Post()
  async create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param(ValidationPipe) { id }: IdDto) {
    try {
      await this.userService.delete(id);
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

  @Put(':id')
  async update(
    @Body(ValidationPipe) updateUserDto: UpdatePasswordDto,
    @Param(ValidationPipe) { id }: IdDto,
  ) {
    try {
      return await this.userService.update(id, updateUserDto);
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
        );
    }
  }
}
