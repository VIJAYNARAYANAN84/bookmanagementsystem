import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book } from './book.entity';

@Module({
  imports: [
    // This connects the BooksModule to the Book entity.
    // The forFeature() method is crucial here as well.
    TypeOrmModule.forFeature([Book])
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}