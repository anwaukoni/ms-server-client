import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { DatabaseService } from 'src/db/db.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    private databaseService: DatabaseService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }
  async validate(payload: { sub: number }) {
    const user = await this.databaseService.executeQuery(
      `SELECT * FROM users WHERE id = $1`,
      [payload.sub],
    );

    if (user.length === 0) {
      throw new ForbiddenException('User not found');
    }

    delete user[0].hash;

    return user;
  }
}
