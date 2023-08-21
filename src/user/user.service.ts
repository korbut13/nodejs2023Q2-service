import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './user.entity';
import { AuthService } from '../auth/auth.service';
import { Token } from '../auth/token.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,

  ) { }
  async getAll() {
    const users = await this.userRepository.find({
      select: ['id', 'login', 'version', 'createdAt', 'updatedAt'],
    });
    return users;
  }

  async getById(id: string, refreshToken: string) {
    const tokenInDb = await this.tokenRepository.findOneBy({ refreshToken: refreshToken });

    console.log(1, tokenInDb)
    if (tokenInDb && !tokenInDb.userId) {
      return null;
    } else {
      const foundUser = await this.userRepository.findOneBy({ id: id });
      if (!foundUser) throw new Error('The user with this id was not found');
      const response = {
        ...foundUser,
        createdAt: Number(foundUser.createdAt),
        updatedAt: Number(foundUser.updatedAt),
      };
      delete response.password;
      return response;
    }

  }

  async create(userDto: CreateUserDto) {
    const date = Number(Date.now());

    const dataNewUser = {
      ...userDto,
      createdAt: date,
      updatedAt: date,
    };

    const newUser = this.userRepository.create(dataNewUser);
    await this.userRepository.save(newUser);
    delete newUser.password;
    return newUser;
  }

  async delete(id: string) {
    const tokenUser = await this.tokenRepository.findOneBy({ userId: id });
    //await this.tokenRepository.delete(tokenUser.id);
    await this.tokenRepository.update(tokenUser.id, { ...tokenUser, userId: null })
    const deletedUser = await this.userRepository.delete(id)

    if (!deletedUser.affected)
      throw new Error('The user with this id was not found')
  }

  // async update(id: string, updateUserDto: UpdatePasswordDto, refreshToken: string) {
  //   const userForUpdate = await this.userRepository.findOneBy({ id: id });
  //   if (!userForUpdate) throw new Error('The user with this id was not found');
  //   if (userForUpdate.password !== updateUserDto.oldPassword)
  //     throw new Error('OldPassword is wrong')

  //   const date = Date.now();
  //   const updatedFields = {
  //     password: updateUserDto.newPassword,
  //     updatedAt: date,
  //   };
  //   await this.userRepository.update(id, updatedFields);
  //   // return await this.getById(id);
  //   return await this.getById(id, refreshToken);
  // }

  async update(id: string, updateUserDto: UpdatePasswordDto, refreshToken: string) {
    const userForUpdate = await this.getById(id, refreshToken);
    if (!userForUpdate) {
      return null
    }
    if (userForUpdate === undefined) throw new Error('The user with this id was not found');
    if (userForUpdate.password !== updateUserDto.oldPassword)
      throw new Error('OldPassword is wrong')

    const date = Date.now();
    const updatedFields = {
      password: updateUserDto.newPassword,
      updatedAt: date,
    };
    await this.userRepository.update(id, updatedFields);
    // return await this.getById(id);
    return await this.getById(id, refreshToken);
  }

  async getUserByLogin(login: string) {
    const user = await this.userRepository.findOneBy({ login: login });
    return user;
  }
}
