import { EditUserDto, GetUserDto } from './dto';
import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getMe(user: GetUserDto): GetUserDto;
    editUser(userId: number, dto: EditUserDto): Promise<any[]>;
}
