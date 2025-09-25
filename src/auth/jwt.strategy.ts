// src/auth/jwt.strategy.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './author.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Author)
    private authorsRepository: Repository<Author>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '82c0a76d6024f2179d00952a42fa6d8422eaf63690ce34d93a008bb32bf09cd9dc48cdefeca270bf5ddad41378ac940ad3e7a80b1b689c36b3a76cce0317aacc', // Must match the secret in AuthModule
    });
  }

  async validate(payload: { email: string; sub: number }) {
    const { email } = payload;
    const author = await this.authorsRepository.findOne({ where: { email } });

    if (!author) {
      throw new UnauthorizedException();
    }
    return author;
  }
}