// src/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Author } from './author.entity';
import { JwtStrategy } from './jwt.strategy'; 

/**
 * @module AuthModule
 * The main module for handling all authentication-related logic.
 * It integrates TypeORM for database interaction (Author entity),
 * Passport for authentication middleware, and JWT for token generation and verification.
 */
@Module({
 imports: [
 /**
     * Registers the Author entity with TypeORM.
     * This allows the AuthService to inject and use the repository for the Author entity.
     */
 TypeOrmModule.forFeature([Author]),
 /**
     * Configures the Passport module.
     * Sets 'jwt' as the default strategy, meaning protected routes will, by default, 
     * expect and validate a JSON Web Token.
     */
 PassportModule.register({ defaultStrategy: 'jwt' }),
 /**
     * Configures the NestJS JWT module.
     * This module is responsible for signing (creating) and verifying JWTs.
     */
 JwtModule.register({
 /**
       * The secret key used to sign the JWT. This must be kept highly secure.
       */
 secret: '82c0a76d6024f2179d00952a42fa6d8422eaf63690ce34d93a008bb32bf09cd9dc48cdefeca270bf5ddad41378ac940ad3e7a80b1b689c36b3a76cce0317aacc', // You must change this!
 /**
       * Default options for signing tokens, e.g., token expiration time.
       */
 signOptions: { expiresIn: '1h' }, // Token expiration
 }),
 ],
 /**
   * Declares the controllers belonging to this module.
   * AuthController handles routes like /auth/login and /auth/signup.
   */
 controllers: [AuthController],
 /**
   * Declares the services and providers belonging to this module.
   */
 providers: [
 AuthService, 
 /**
     * The Passport strategy that implements the logic for validating a JWT.
     * It is used by Passport to authenticate requests.
     */
 JwtStrategy
 ], 
})
export class AuthModule {}