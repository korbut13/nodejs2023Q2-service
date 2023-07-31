import { Injectable } from '@nestjs/common';
import { dataBase } from '../dataBase';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { v4 } from 'uuid';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()

export class UserService {
  dataBase = dataBase.user;

  getAll() {
    return this.dataBase;
  }

  getById(id: string) {
    const foundUser: UserDto = this.dataBase.find(user => user.id === id);

    if (foundUser !== undefined) {
      const respUser = { ...foundUser };
      delete respUser.password;
      return respUser;
    } else {
      throw new Error('The user with this id was not found');
    }
  }

  create(userDto: CreateUserDto) {
    const idUser = v4();
    const version = 1;
    const createdAt = Date.now();
    const updatedAt = createdAt;

    const newUser = {
      ...userDto,
      id: idUser,
      version: version,
      createdAt: createdAt,
      updatedAt: updatedAt,
    };

    this.dataBase.push(newUser);

    const respNewUser = {
      id: idUser,
      login: newUser.login,
      version: newUser.version,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    }

    return respNewUser;
  }

  delete(id: string) {
    const userForDelete = this.dataBase.find(user => user.id === id);
    if (userForDelete) {
      this.dataBase = this.dataBase.filter(user => user.id !== id);
    } else {
      throw new Error('The user with this id was not found')
    }
  }

  update(id: string, updateUserDto: UpdatePasswordDto) {

    const userForUpdate = this.dataBase.find(user => user.id === id);

    if (userForUpdate !== undefined) {
      if (userForUpdate.password !== updateUserDto.oldPassword) {
        throw new Error('OldPassword is wrong');
      } else {
        userForUpdate.password = updateUserDto.newPassword;
        userForUpdate.version = userForUpdate.version + 1;
        userForUpdate.updatedAt = Date.now();

        const resp = { ...userForUpdate };
        delete resp.password;

        return resp;
      }
    } else {
      throw new Error('The user with this id was not found')
    }
  }
}
