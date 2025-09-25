// src/books/dto/create-book.dto.ts

import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  genre: string;

  @IsDateString()
  publishedDate: Date;
}