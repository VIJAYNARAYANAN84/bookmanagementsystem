// src/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Author } from './author.entity';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Author]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: '82c0a76d6024f2179d00952a42fa6d8422eaf63690ce34d93a008bb32bf09cd9dc48cdefeca270bf5ddad41378ac940ad3e7a80b1b689c36b3a76cce0317aacc', // You must change this!
      signOptions: { expiresIn: '1h' }, // Token expiration
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], // Add the new strategy
})
export class AuthModule {}