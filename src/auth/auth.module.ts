import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './token.entity';
import { UserService } from '../user/user.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    TypeOrmModule.forFeature([Token]),
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: process.env.JWT_ACCESS_TOKEN || 'SECRET',
      signOptions: {
        expiresIn: '30m'
      }
    })
  ],
  exports: [
    AuthService,
    JwtModule
  ]
})
export class AuthModule { };
