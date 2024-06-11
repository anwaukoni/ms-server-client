import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { DatabaseService } from '../db/db.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto';
import { ForbiddenException } from '@nestjs/common';
import * as argon from 'argon2';

describe('AuthService', () => {
  let authService: AuthService;
  let databaseService: DatabaseService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let configService: ConfigService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: DatabaseService,
          useValue: {
            executeQuery: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              return {
                JWT_SECRET: 'test_secret',
                JWT_EXPIRES_IN: '3600s',
              }[key];
            }),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    databaseService = module.get<DatabaseService>(DatabaseService);
    configService = module.get<ConfigService>(ConfigService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('signup', () => {
    it('should sign up a new user', async () => {
      const dto: AuthDto = { email: 'test@example.com', password: 'test' };

      jest
        .spyOn(databaseService, 'executeQuery')
        .mockImplementationOnce(async () => []);

      jest
        .spyOn(databaseService, 'executeQuery')
        .mockImplementationOnce(async () => [
          {
            id: 1,
            email: dto.email,
            hash: 'test_hash',
          },
        ]);

      jest.spyOn(jwtService, 'signAsync').mockResolvedValue('test_token');

      const result = await authService.signup(dto);

      expect(result).toMatchObject({ access_token: 'test_token' });
    });

    it('should throw an error if user already exists', async () => {
      const dto: AuthDto = { email: 'test@example.com', password: 'test' };

      jest
        .spyOn(databaseService, 'executeQuery')
        .mockImplementationOnce(async () => [
          {
            email: dto.email,
          },
        ]);

      await expect(authService.signup(dto)).rejects.toThrow(ForbiddenException);
    });
  });

  describe('signin', () => {
    it('should sign in an existing user', async () => {
      const dto: AuthDto = { email: 'test@example.com', password: 'test' };
      const user = { id: 1, email: dto.email, hash: 'test_hash' };

      jest
        .spyOn(databaseService, 'executeQuery')
        .mockImplementationOnce(async () => [user]);

      jest.spyOn(argon, 'verify').mockResolvedValue(true);

      jest.spyOn(jwtService, 'signAsync').mockResolvedValue('test_token');

      const result = await authService.signin(dto);

      expect(result).toMatchObject({ access_token: 'test_token' });
    });

    it('should throw an error for invalid credentials', async () => {
      const dto: AuthDto = { email: 'test@example.com', password: 'test' };

      jest
        .spyOn(databaseService, 'executeQuery')
        .mockImplementationOnce(async () => []);

      await expect(authService.signin(dto)).rejects.toThrow(ForbiddenException);
    });

    it('should throw an error for incorrect password', async () => {
      const dto: AuthDto = { email: 'test@example.com', password: 'test' };
      const user = { id: 1, email: dto.email, hash: 'test_hash' };

      jest
        .spyOn(databaseService, 'executeQuery')
        .mockImplementationOnce(async () => [user]);

      jest.spyOn(argon, 'verify').mockResolvedValue(false);

      await expect(authService.signin(dto)).rejects.toThrow(ForbiddenException);
    });
  });
});
