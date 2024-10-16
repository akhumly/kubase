import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

@Injectable()
export class UserService {
  private prisma = new PrismaClient();

  async getUsers() {
    return this.prisma.user.findMany();
  }
}
