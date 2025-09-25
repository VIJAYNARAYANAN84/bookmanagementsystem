import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Author } from './author.entity';

@Module({
  imports: [
    // This connects the AuthModule to the Author entity.
    // The forFeature() method registers the repository for this entity
    // in the current module's scope.
    TypeOrmModule.forFeature([Author])
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}