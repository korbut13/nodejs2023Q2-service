import { Body, Controller, Get, Param, Post, Delete, Put, HttpException, HttpStatus, ValidationPipe, HttpCode } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserService } from './user.service';
import { UserIdDto } from './dto/userId.dto';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {

  }
  @Get()
  async getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  getById(@Param(ValidationPipe) userIdDto: UserIdDto) {
    try {
      return this.userService.getById(userIdDto.id);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'The user with this id was not found',
      }, HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param(ValidationPipe) userIdDto: UserIdDto) {
    try {
      this.userService.delete(userIdDto.id)
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'The user with this id was not found',
      }, HttpStatus.NOT_FOUND);
    }
  }

  @Put(':id')
  update(@Body(ValidationPipe) updateUserDto: UpdatePasswordDto, @Param(ValidationPipe) userIdDto: UserIdDto) {

    try {
      return this.userService.update(userIdDto.id, updateUserDto);

    } catch (error) {
      if (error.message === 'The user with this id was not found') {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: 'The user with this id was not found',
        }, HttpStatus.NOT_FOUND);
      } else if (error.message === 'OldPassword is wrong')
        throw new HttpException({
          status: HttpStatus.FORBIDDEN,
          error: 'OldPassword is wrong',
        }, HttpStatus.FORBIDDEN);
    }
  }
}
