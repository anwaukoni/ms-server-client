import { TaskService } from './task.service';
import { CreateTaskDto, EditTaskDto, CreateTasksDto } from './dto';
export declare class TaskController {
    private taskService;
    constructor(taskService: TaskService);
    getTasks(userId: number): Promise<any[]>;
    getTaskById(userId: number, taskId: number): Promise<any[]>;
    createTask(userId: number, dto: CreateTaskDto): Promise<any[]>;
    createTasks(userId: number, dto: CreateTasksDto[]): Promise<void>;
    editTaskById(userId: number, taskId: number, dto: EditTaskDto): Promise<any[]>;
    moveTask(userId: number, taskId: number, newPosition: number): Promise<any[]>;
}
