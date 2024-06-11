import { EditUserDto } from './dto';
import { DatabaseService } from 'src/db/db.service';
export declare class UserService {
    private databaseService;
    constructor(databaseService: DatabaseService);
    editUser(userId: number, dto: EditUserDto): Promise<any[]>;
}
