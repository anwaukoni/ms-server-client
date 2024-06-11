import { CreateTaskDto, EditTaskDto } from './dto';
import { DatabaseService } from 'src/db/db.service';
export declare class TaskService {
    private databaseService;
    constructor(databaseService: DatabaseService);
    getTasks(userId: number): Promise<any[]>;
    getTaskById(userId: number, taskId: number): Promise<any[]>;
    createTask(userId: number, dto: CreateTaskDto): Promise<any[]>;
    createTasks(userId: number, tasks: any[]): Promise<void>;
    editTaskById(userId: number, taskId: number, dto: EditTaskDto): Promise<any[]>;
    moveTask(userId: number, taskId: number, newPosition: number): Promise<any[]>;
}
