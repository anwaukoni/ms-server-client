import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { TaskService } from './task.service';
import { CreateTaskDto, EditTaskDto, CreateTasksDto } from './dto';

@UseGuards(JwtGuard)
@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  getTasks(@GetUser('id') userId: number) {
    return this.taskService.getTasks(userId);
  }

  @Get(':id')
  getTaskById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) taskId: number,
  ) {
    console.log('userId', userId);
    console.log('taskId', taskId);

    return this.taskService.getTaskById(userId, taskId);
  }

  @Post()
  createTask(@GetUser('id') userId: number, @Body() dto: CreateTaskDto) {
    return this.taskService.createTask(userId, dto);
  }

  @Post('batch')
  createTasks(@GetUser('id') userId: number, @Body() dto: CreateTasksDto[]) {
    return this.taskService.createTasks(userId, dto);
  }
  @Put(':id')
  editTaskById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) taskId: number,
    @Body() dto: EditTaskDto,
  ) {
    return this.taskService.editTaskById(userId, taskId, dto);
  }

  @Put(':id/move')
  moveTask(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) taskId: number,
    @Body('newPosition', ParseIntPipe) newPosition: number,
  ) {
    return this.taskService.moveTask(userId, taskId, newPosition);
  }
}
