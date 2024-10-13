// user/user.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { expect } from '@jest/globals';

// Mock PrismaClient for isolation of unit tests
jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    user: {
      create: jest.fn((data) => Promise.resolve({ id: 1, ...data.data })),
      findMany: jest.fn(() =>
        Promise.resolve([
          { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
        ]),
      ),
      findUnique: jest.fn(({ where: { id } }) =>
        Promise.resolve({
          id,
          name: 'John Doe',
          email: 'john.doe@example.com',
        }),
      ),
    },
  })),
}));

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const result = await service.createUser('Jane Doe', 'jane.doe@example.com');
    expect(result).toEqual({
      id: 1,
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
    });
  });

  it('should return an array of users', async () => {
    const users = await service.getUsers();
    expect(Array.isArray(users)).toBe(true);
    expect(users[0].name).toBe('John Doe');
  });

  it('should return a user by ID', async () => {
    const user = await service.getUser(1);
    expect(user).toEqual({
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
    });
  });
});
