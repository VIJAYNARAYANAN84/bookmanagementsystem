// src/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Author } from './author.entity';
import { JwtStrategy } from './jwt.strategy'; // We will create this next

@Module({
  imports: [
    TypeOrmModule.forFeature([Author]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'YOUR_SECRET_KEY', // You must change this!
      signOptions: { expiresIn: '1h' }, // Token expiration
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], // Add the new strategy
})
export class AuthModule {}