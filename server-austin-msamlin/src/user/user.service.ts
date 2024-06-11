import { Injectable } from '@nestjs/common';
import { EditUserDto } from './dto';
import { DatabaseService } from 'src/db/db.service';

@Injectable()
export class UserService {
  constructor(private databaseService: DatabaseService) {}

  async editUser(userId: number, dto: EditUserDto) {
    const setClause = Object.keys(dto)
      .map((key) => `"${key}" = '${dto[key]}'`)
      .join(', ');

    const user = await this.databaseService.executeQuery(
      `UPDATE users SET ${setClause} WHERE id = $1 RETURNING *`,
      [userId],
    );

    // delete user[0].hash;

    return user;
  }
}
