import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './user.entity';
import { Token } from '../auth/token.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}
  async getAll() {
    const users = await this.userRepository.find({
      select: ['id', 'login', 'version', 'createdAt', 'updatedAt'],
    });
    return users;
  }

  async getById(id: string) {
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

  async getUserByLogin(user: CreateUserDto) {
    const u = await this.userRepository.findOneBy({ login: user.login });
    return u;
  }

  async create(userDto: CreateUserDto) {
    const date = Number(Date.now());
    const hashPassword = await bcrypt.hash(userDto.password, 5);

    const dataNewUser = {
      ...userDto,
      password: hashPassword,
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

    if (tokenUser) {
      await this.tokenRepository.delete(tokenUser.id);
    }
    const deletedUser = await this.userRepository.delete(id);
    if (!deletedUser.affected)
      throw new Error('The user with this id was not found');
  }

  async update(id: string, updateUserDto: UpdatePasswordDto) {
    const userForUpdate = await this.userRepository.findOneBy({ id: id });

    if (!userForUpdate) throw new Error('The user with this id was not found');

    const passwordEquals = await bcrypt.compare(
      updateUserDto.oldPassword,
      userForUpdate.password,
    );

    if (!passwordEquals) {
      throw new Error('OldPassword is wrong');
    }

    const newPassportHash = await bcrypt.hash(updateUserDto.newPassword, 5);
    const date = Date.now();
    const updatedFields = {
      password: newPassportHash,
      updatedAt: date,
    };
    await this.userRepository.update(id, updatedFields);
    return await this.getById(id);
  }
}
