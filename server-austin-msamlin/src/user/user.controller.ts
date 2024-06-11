import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { EditUserDto, GetUserDto } from './dto';
import { GetUser } from 'src/auth/decorator';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  getMe(@GetUser() user: GetUserDto) {
    return user;
  }

  @Put()
  editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }
}
