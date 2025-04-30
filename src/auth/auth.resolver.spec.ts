import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { SignupInput } from './dto/signup.input';
import { LoginInput } from './dto/login.input';
import { SignupResponse } from './dto/signup-response';
import { LoginResponse } from './dto/login-response';
import { User } from '../user/user.entity';

describe('AuthResolver', () => {
  let resolver: AuthResolver;
  let authService: AuthService;

  const mockAuthService = {
    signup: jest.fn(),
    login: jest.fn(),
    me: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
    authService = module.get<AuthService>(AuthService);
  });

  describe('signup', () => {
    it('should call authService.signup and return the result', async () => {
      const input: SignupInput = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      };

      const mockUser: User = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        password: '',
      };

      const response: SignupResponse = {
        user: mockUser,
        token: 'mockSignupToken',
      };

      mockAuthService.signup.mockResolvedValue(response);

      const result = await resolver.signup(input);
      expect(result).toEqual(response);
      expect(authService.signup).toHaveBeenCalledWith(input);
    });
  });

  describe('login', () => {
    it('should call authService.login and set the cookie in the response', async () => {
      const input: LoginInput = {
        email: 'test@example.com',
        password: 'password123',
      };

      const token = 'mockLoginToken';
      const response: LoginResponse = { token };

      const mockRes = {
        cookie: jest.fn(),
      };

      mockAuthService.login.mockResolvedValue({ token });

      const result = await resolver.login(input, { res: mockRes as any });
      expect(result).toEqual(response);
      expect(authService.login).toHaveBeenCalledWith(input);
      expect(mockRes.cookie).toHaveBeenCalledWith(
        'token',
        token,
        expect.objectContaining({
          httpOnly: true,
        }),
      );
    });
  });

  describe('me', () => {
    it('should call authService.me with the user ID and return the user', async () => {
      const mockUser: User = {
        id: 123,
        username: 'testuser',
        email: 'test@example.com',
        password: '',
      };

      mockAuthService.me.mockResolvedValue(mockUser);

      const result = await resolver.me(mockUser);
      expect(result).toEqual(mockUser);
      expect(authService.me).toHaveBeenCalledWith(mockUser.id);
    });
  });
});
