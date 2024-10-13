// user/user.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { expect } from '@jest/globals';

// Mocked UserService to avoid real database interaction
const mockUserService = {
  createUser: jest.fn((name: string, email: string) => ({
    id: 1,
    name,
    email,
  })),
  getUsers: jest.fn(() => [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
  ]),
  getUser: jest.fn((id: number) => ({
    id,
    name: 'John Doe',
    email: 'john.doe@example.com',
  })),
};

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: UserService, useValue: mockUserService }, // Mocked service
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Test the HTTP POST endpoint
  it('should create a user (HTTP)', async () => {
    const result = await controller.createUser({
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
    });
    expect(result).toEqual({
      id: 1,
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
    });
    expect(service.createUser).toHaveBeenCalledWith(
      'Jane Doe',
      'jane.doe@example.com',
    );
  });

  // Test the HTTP GET endpoint
  it('should return an array of users (HTTP)', async () => {
    const result = await controller.getAllUsers();
    expect(result).toEqual([
      { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    ]);
    expect(service.getUsers).toHaveBeenCalled();
  });

  // Test the microservice pattern for getting a user by ID
  it('should return a user by ID (Microservice)', async () => {
    const result = await controller.getUserById({ id: 1 });
    expect(result).toEqual({
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
    });
    expect(service.getUser).toHaveBeenCalledWith(1);
  });

  // Test the microservice pattern for creating a user
  it('should create a user (Microservice)', async () => {
    const result = await controller.createUserMicroservice({
      name: 'John Doe',
      email: 'john.doe@example.com',
    });
    expect(result).toEqual({
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
    });
    expect(service.createUser).toHaveBeenCalledWith(
      'John Doe',
      'john.doe@example.com',
    );
  });
});
