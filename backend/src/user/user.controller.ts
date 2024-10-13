// user/user.controller.ts

import { Controller, Get, Post, Body } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // HTTP GET request to fetch all users
  @Get()
  async getAllUsers() {
    return this.userService.getUsers();
  }

  // HTTP POST request to create a user
  @Post()
  async createUser(@Body() body: { name: string; email: string }) {
    return this.userService.createUser(body.name, body.email);
  }

  // Microservice MessagePattern to get a user by ID
  @MessagePattern({ cmd: 'get_user' })
  async getUserById(data: { id: number }) {
    return this.userService.getUser(data.id);
  }

  // Microservice MessagePattern to create a user
  @MessagePattern({ cmd: 'create_user' })
  async createUserMicroservice(data: { name: string; email: string }) {
    return this.userService.createUser(data.name, data.email);
  }
}
