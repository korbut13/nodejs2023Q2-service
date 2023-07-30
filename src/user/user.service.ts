import { Injectable } from '@nestjs/common';
import { dataBase } from '../dataBase';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { v4 } from 'uuid';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()

export class UserService {
  dataBase = dataBase;

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

  update(id: string, updateUserDto: UpdateUserDto) {
    const userForUpdate = this.dataBase.find(user => user.id === id);
    console.log("user for update", userForUpdate, 5555, updateUserDto.oldPassword, 5555, userForUpdate.password === updateUserDto.oldPassword, 5555, updateUserDto);

    if (userForUpdate) {
      if (userForUpdate.password !== updateUserDto.oldPassword) {
        throw new Error('OldPassword is wrong');
      } else {
        this.dataBase = this.dataBase.map(user => user.id === id ?
          {
            ...user,
            password: user.login,
            version: user.version + 1,
            updatedAt: Date.now(),
          } : user);
      }

    } else {
      throw new Error('The user with this id was not found')
    }

  }
}
