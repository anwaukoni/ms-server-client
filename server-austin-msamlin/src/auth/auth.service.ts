import { ForbiddenException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../db/db.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private databaseService: DatabaseService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}
  async signup(dto: AuthDto) {
    // const hash = await argon.hash(dto.password);

    const userExists = await this.databaseService.executeQuery(
      `SELECT * FROM users WHERE email = '${dto.email}';`,
    );

    if (userExists.length) {
      throw new ForbiddenException('Credentials already exists');
    }

    const user = await this.databaseService.executeQuery(
      `INSERT INTO users (email, hash) VALUES ('${dto.email}', '${dto.password}') RETURNING *;`,
    );

    const token = await this.signToken(user[0].id, user[0].email);

    return { access_token: token, user: user[0] };
  }

  async signin(dto: AuthDto) {
    const user = await this.databaseService.executeQuery(
      `SELECT * FROM users WHERE email = '${dto.email}';`,
    );

    if (!user.length) {
      throw new ForbiddenException('Invalid credentials');
    }
    // const verifyPassword = await argon.verify(user[0].hash, dto.password);

    if (user[0].hash !== dto.password) {
      throw new ForbiddenException('Invalid credentials');
    }

    const token = await this.signToken(user[0].id, user[0].email);

    return { access_token: token };
  }

  signToken(userId: number, email: string): Promise<string> {
    const payload = { sub: userId, email };
    const secret = this.configService.get('JWT_SECRET');
    const expiresIn = this.configService.get('JWT_EXPIRES_IN');

    return this.jwtService.signAsync(payload, { secret, expiresIn });
  }
}
