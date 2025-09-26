// src/auth/auth.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { LoginDto } from './dto/login.dto';

/**
 * Controller responsible for handling all incoming HTTP requests 
 * related to authentication, such as user registration and login.
 * The base route for this controller is '/auth'.
 */
@Controller('auth')
export class AuthController {
  /**
   * Injects the AuthService dependency into the controller.
   * This is how the controller gets access to the authentication business logic.
   * @param {AuthService} authService - The service that handles the core authentication logic.
   */
  
  constructor(private authService: AuthService) {}

  /**
   * @description Handles POST requests to the '/auth/register' endpoint.
   * Registers a new user (likely an 'author' in a book management system).
   * @param {CreateAuthorDto} createAuthorDto - Data Transfer Object containing 
   * the necessary information (e.g., name, email, password) for registration, 
   * extracted from the request body.
   * @returns {Promise<any>} The result from the AuthService, typically the 
   * newly created user's data or an authentication token.
   */
  @Post('register')
  async register(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authService.register(createAuthorDto);
  }

  /**
   * @description Handles POST requests to the '/auth/login' endpoint.
   * Authenticates an existing user and returns an authentication token (e.g., JWT).
   * @param {LoginDto} loginDto - Data Transfer Object containing the user's 
   * credentials (email and password) from the request body.
   * @returns {Promise<any>} The result from the AuthService, typically an 
   * authentication token upon successful login.
   */
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }
}