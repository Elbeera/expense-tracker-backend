import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SignupInput } from './dto/signup.input';
import { LoginInput } from './dto/login.input';

describe('AuthService', () => {
  let service: AuthService;
  let userRepo: jest.Mocked<Repository<User>>;
  let jwtService: JwtService;

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('mockToken'),
  };

  const mockUserRepo = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
  } as unknown as jest.Mocked<Repository<User>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getRepositoryToken(User), useValue: mockUserRepo },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepo = module.get(getRepositoryToken(User));
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear all mocks between tests
  });

  describe('signup', () => {
    it('should hash password, create user, save it, and return user and token', async () => {
      const input: SignupInput = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      };

      const hashedPassword = 'hashedPassword123';

      // 👇 Spy on bcrypt.hash and mock it
      const hashSpy = jest
        .spyOn(bcrypt, 'hash' as any)
        .mockResolvedValue(hashedPassword);

      const mockUser = {
        id: 1,
        username: input.username,
        email: input.email,
        password: hashedPassword,
      } as User;

      userRepo.create.mockReturnValue(mockUser);
      userRepo.save.mockResolvedValue(mockUser);

      const result = await service.signup(input);

      expect(hashSpy).toHaveBeenCalledWith(input.password, 10);
      expect(userRepo.create).toHaveBeenCalledWith({
        username: input.username,
        email: input.email,
        password: hashedPassword,
      });
      expect(userRepo.save).toHaveBeenCalledWith(mockUser);
      expect(jwtService.sign).toHaveBeenCalledWith({
        userId: mockUser.id,
        email: mockUser.email,
        name: mockUser.username,
      });
      expect(result).toEqual({ user: mockUser, token: 'mockToken' });
    });
  });

  describe('login', () => {
    it('should validate user and return token', async () => {
      const input: LoginInput = {
        email: 'test@example.com',
        password: 'password123',
      };

      const mockUser = {
        id: 1,
        username: 'testuser',
        email: input.email,
        password: 'hashedPassword',
      };

      userRepo.findOne.mockResolvedValue(mockUser as User);
      jest.spyOn(bcrypt, 'compare' as any).mockResolvedValue(true);

      const result = await service.login(input);

      expect(userRepo.findOne).toHaveBeenCalledWith({
        where: { email: input.email },
      });
      expect(bcrypt.compare).toHaveBeenCalledWith(
        input.password,
        mockUser.password,
      );
      expect(jwtService.sign).toHaveBeenCalledWith({
        userId: mockUser.id,
        email: mockUser.email,
        name: mockUser.username,
      });
      expect(result).toEqual({ token: 'mockToken' });
    });

    it('should throw if user is not found', async () => {
      userRepo.findOne.mockResolvedValue(null);

      await expect(
        service.login({ email: 'notfound@example.com', password: 'test' }),
      ).rejects.toThrow('User not found');
    });

    it('should throw if password is invalid', async () => {
      const input: LoginInput = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };

      const mockUser = {
        id: 1,
        username: 'testuser',
        email: input.email,
        password: 'hashedPassword',
      };

      userRepo.findOne.mockResolvedValue(mockUser as User);
      jest.spyOn(bcrypt, 'compare' as any).mockResolvedValue(false);

      await expect(service.login(input)).rejects.toThrow('Invalid credentials');
    });
  });

  describe('me', () => {
    it('should return the user by ID', async () => {
      const mockUser = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
      } as User;

      userRepo.findOne.mockResolvedValue(mockUser);

      const result = await service.me(mockUser.id);
      expect(userRepo.findOne).toHaveBeenCalledWith({
        where: { id: mockUser.id },
      });
      expect(result).toEqual(mockUser);
    });

    it('should throw if user not found', async () => {
      userRepo.findOne.mockResolvedValue(null);

      await expect(service.me(999)).rejects.toThrow('User not found');
    });
  });
});
