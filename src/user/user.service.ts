// import { Injectable } from '@nestjs/common';
// import { dataBase } from '../dataBase';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UserDto } from './dto/user.dto';
// import { v4 } from 'uuid';
// import { UpdatePasswordDto } from './dto/update-password.dto';

// @Injectable()
// export class UserService {

//   getAll() {
//     const resp = dataBase.user.map(user => {
//       return { id: user.id, login: user.login, updatedAt: user.updatedAt, version: user.version }
//     })
//     return resp;
//   }

//   getById(id: string) {
//     const foundUser: UserDto = dataBase.user.find((user) => user.id === id);

//     if (foundUser !== undefined) {
//       const respUser = { ...foundUser };
//       delete respUser.password;
//       return respUser;
//     } else {
//       throw new Error('The user with this id was not found');
//     }
//   }

//   create(userDto: CreateUserDto) {
//     const idUser = v4();
//     const version = 1;
//     const createdAt = Date.now();
//     const updatedAt = createdAt;

//     const newUser = {
//       ...userDto,
//       id: idUser,
//       version: version,
//       createdAt: createdAt,
//       updatedAt: updatedAt,
//     };

//     dataBase.user.push(newUser);

//     const respNewUser = {
//       id: idUser,
//       login: newUser.login,
//       version: newUser.version,
//       createdAt: newUser.createdAt,
//       updatedAt: newUser.updatedAt,
//     };

//     return respNewUser;
//   }

//   delete(id: string) {
//     const userForDelete = dataBase.user.find((user) => user.id === id);
//     if (userForDelete) {
//       dataBase.user = dataBase.user.filter((user) => user.id !== id);
//     } else {
//       throw new Error('The user with this id was not found');
//     }
//   }

//   update(id: string, updateUserDto: UpdatePasswordDto) {
//     const userForUpdate = dataBase.user.find((user) => user.id === id);

//     if (userForUpdate !== undefined) {
//       if (userForUpdate.password !== updateUserDto.oldPassword) {
//         throw new Error('OldPassword is wrong');
//       } else {
//         userForUpdate.password = updateUserDto.newPassword;
//         userForUpdate.version = userForUpdate.version + 1;
//         userForUpdate.updatedAt = Date.now();

//         const resp = { ...userForUpdate };
//         delete resp.password;

//         return resp;
//       }
//     } else {
//       throw new Error('The user with this id was not found');
//     }
//   }
// }


import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { dataBase } from '../dataBase';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }
  async getAll() {
    const users = await this.userRepository.find({
      select: [
        'id', 'login', 'version', 'createdAt', 'updatedAt'
      ]
    });
    return users;
  }

  async getById(id: string) {
    const foundUser = await this.userRepository.findOneBy({ id: id });
    if (!foundUser) throw new Error('The user with this id was not found');
    const response = { ...foundUser, createdAt: Number(foundUser.createdAt), updatedAt: Number(foundUser.updatedAt), };
    delete response.password;
    return response;
  }

  async create(userDto: CreateUserDto) {
    const date = Number(Date.now());

    const dataNewUser = {
      ...userDto,
      createdAt: date,
      updatedAt: date,
    }

    const newUser = this.userRepository.create(dataNewUser);
    await this.userRepository.save(newUser);
    delete newUser.password;
    return newUser;
  }

  async delete(id: string) {
    const deletedUser = await this.userRepository.delete(id);
    if (!deletedUser.affected) throw new Error('The user with this id was not found');
  }

  async update(id: string, updateUserDto: UpdatePasswordDto) {

    const userForUpdate = await this.userRepository.findOneBy({ id: id });
    if (!userForUpdate) throw new Error('The user with this id was not found');
    if (userForUpdate.password !== updateUserDto.oldPassword) throw new Error('OldPassword is wrong');

    const date = Date.now();
    const updatedFields = {
      password: updateUserDto.newPassword,
      updatedAt: date
    }
    await this.userRepository.update(id, updatedFields)
    return await this.getById(id);
  }
}
