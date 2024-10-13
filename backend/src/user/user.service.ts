// user/user.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UserService {
  private prisma = new PrismaClient();

  // Create a new user
  async createUser(name: string, email: string) {
    return this.prisma.user.create({
      data: { name, email },
    });
  }

  // Retrieve all users
  async getUsers() {
    return this.prisma.user.findMany();
  }

  // Retrieve a single user by ID (for microservice pattern or HTTP GET with params)
  async getUser(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
}
