import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { DB_CONNECTION } from 'src/constants';

jest.mock('src/constants', () => ({
  ...jest.requireActual('src/constants'),
  DB_CONNECTION: 'mock_database_connection_string',
}));

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signup: jest.fn(),
            signin: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('signup', () => {
    it('should call AuthService.signup and return result', async () => {
      const dto: AuthDto = { email: 'test@example.com', password: 'test' };
      const result = { access_token: 'test_token' };

      jest.spyOn(authService, 'signup').mockResolvedValue(result);

      expect(await authController.signup(dto)).toEqual(result);
      expect(authService.signup).toHaveBeenCalledWith(dto);
    });
  });

  describe('signin', () => {
    it('should call AuthService.signin and return result', async () => {
      const dto: AuthDto = { email: 'test@example.com', password: 'test' };
      const result = { access_token: 'test_token' };

      jest.spyOn(authService, 'signin').mockResolvedValue(result);

      expect(await authController.signin(dto)).toEqual(result);
      expect(authService.signin).toHaveBeenCalledWith(dto);
    });
  });
});
