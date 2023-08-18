import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
    private jwtService: JwtService) { }

  async signup(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByLogin(userDto.login);
    if (candidate) {
      throw new HttpException('A user with this login already exists', HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const newUser = await this.userService.create({ ...userDto, password: hashPassword });
    return this.generateToken(newUser);

  }

  async generateToken(user: User) {
    const payload = { userId: user.id, login: user.login, expiration: '24h' };
    return {
      token: this.jwtService.sign(payload)
    }
  }


  async login(userDto: CreateUserDto) {

  }
}
