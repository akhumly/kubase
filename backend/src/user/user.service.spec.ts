import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { expect } from '@jest/globals';

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
    const email = `jane.doe.${Date.now()}@example.com`; // Generate a unique email
    const user = await service.createUser('Jane Doe', email);
    expect(user).toHaveProperty('id');
    expect(user.name).toBe('Jane Doe');
  });

  it('should return an array of users', async () => {
    const users = await service.getUsers();
    expect(Array.isArray(users)).toBe(true);
  });
});
