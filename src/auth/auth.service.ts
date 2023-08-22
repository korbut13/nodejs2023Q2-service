import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../user/user.entity';
import { Token } from './token.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  async signup(userDto: CreateUserDto) {
    try {
      const newUser = await this.userService.create(userDto);
      const tokenData = await this.generateToken(newUser);
      this.saveToken(newUser.id, tokenData.refreshToken);
      return {
        user: newUser,
        ...tokenData,
      };
    } catch (error) {
      console.log('SignupServiceError', error);
    }
  }

  async generateToken(user: User) {
    const payload = { userId: user.id, login: user.login, expiration: '30m' };
    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '30m' }),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '30d' }),
    };
  }

  async saveToken(userId: string, refreshToken: string) {
    const tokenData = await this.tokenRepository.findOneBy({ userId: userId });
    let token;
    if (tokenData) {
      const updateTokenData = {
        userId: tokenData.userId,
        refreshToken: refreshToken,
      };
      await this.tokenRepository.update(tokenData.id, updateTokenData);
      token = tokenData;
    } else {
      token = this.tokenRepository.create({ userId: userId, refreshToken });
      await this.tokenRepository.save(token);
    }

    return token;
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByLogin(userDto);

    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (user && passwordEquals) {
      return user;
    } else {
      throw new HttpException(
        "no user with such login, password doesn't match actual one, etc",
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async login(userDto: CreateUserDto) {
    try {
      const user = await this.validateUser(userDto);
      const tokenData = await this.generateToken(user);
      this.saveToken(user.id, tokenData.refreshToken);
      return {
        ...tokenData,
      };
    } catch (error) {
      console.log('loginServerError', error);
    }
  }

  async refresh(refreshToken: { refreshToken: string }) {
    if (!refreshToken) {
      throw new HttpException(
        'рефреш токен не пришел',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const refreshTokenInDataBase = await this.tokenRepository.findOneBy({
      refreshToken: refreshToken.refreshToken,
    });
    if (!refreshTokenInDataBase) {
      throw new HttpException('такого токена нет', HttpStatus.FORBIDDEN);
    }
    const user = await this.userService.getById(refreshTokenInDataBase.userId);
    const tokenData = await this.generateToken(user);
    this.saveToken(user.id, tokenData.refreshToken);
    return {
      ...tokenData,
    };
  }
}
