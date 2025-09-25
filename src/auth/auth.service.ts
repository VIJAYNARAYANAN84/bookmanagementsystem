// src/auth/auth.service.ts

import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'; // Library for password hashing
import { JwtService } from '@nestjs/jwt'; // To create JWT tokens
import { Author } from './author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Author)
    private authorsRepository: Repository<Author>,
    private jwtService: JwtService,
  ) {}

  async register(createAuthorDto: CreateAuthorDto): Promise<Author> {
    // 1. Check if the author already exists
    const existingAuthor = await this.authorsRepository.findOne({
      where: { email: createAuthorDto.email },
    });
    if (existingAuthor) {
      throw new BadRequestException('Author with this email already exists.');
    }

    // 2. Hash the password before saving it
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createAuthorDto.password, salt);

    // 3. Create and save the new author
    const newAuthor = this.authorsRepository.create({
      ...createAuthorDto,
      password: hashedPassword,
    });

    return this.authorsRepository.save(newAuthor);
  }

  async login(email: string, pass: string): Promise<{ access_token: string }> {
    // 1. Find the author by email
    const author = await this.authorsRepository.findOne({ where: { email } });
    if (!author) {
      throw new BadRequestException('Invalid credentials.');
    }

    // 2. Compare the provided password with the stored hash
    const isMatch = await bcrypt.compare(pass, author.password);
    if (!isMatch) {
      throw new BadRequestException('Invalid credentials.');
    }

    // 3. If passwords match, generate a JWT token
    const payload = { email: author.email, sub: author.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}