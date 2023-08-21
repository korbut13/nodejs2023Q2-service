import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './user.entity';
import { AuthModule } from '../auth/auth.module';
import { Token } from '../auth/token.entity';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    TypeOrmModule.forFeature([User, Token]),
    forwardRef(() => AuthModule),
  ],
  exports: [UserService],
})
export class UserModule {}
