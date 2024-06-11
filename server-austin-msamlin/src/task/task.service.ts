import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateTaskDto, EditTaskDto } from './dto';
import { DatabaseService } from 'src/db/db.service';

@Injectable()
export class TaskService {
  constructor(private databaseService: DatabaseService) {}

  async getTasks(userId: number) {
    const tasks = await this.databaseService.executeQuery(
      'SELECT * FROM tasks WHERE "userId" = $1 ORDER BY "sortOrder" ASC',
      [userId],
    );

    return tasks;
  }

  async getTaskById(userId: number, taskId: number) {
    const task = await this.databaseService.executeQuery(
      'SELECT * FROM tasks WHERE id = $1 AND "userId" = $2',
      [taskId, userId],
    );

    return task;
  }

  async createTask(userId: number, dto: CreateTaskDto) {
    // create the task
    const task = await this.databaseService.executeQuery(
      'INSERT INTO tasks ("userId", "sortOrder", description) VALUES ($1, $2, $3) RETURNING *',
      [userId, dto.sortOrder, dto.message],
    );

    return task;
  }

  async createTasks(userId: number, tasks: any[]) {
    // find all in database with IDs in tasks
    const existingTasks = await this.databaseService.executeQuery(
      `SELECT * FROM tasks WHERE "userId" = $1 AND id IN (${tasks
        .map((task) => `'${task.id}'`)
        .join(', ')})`,
      [userId],
    );

    const updateTasks = [];
    const newTasks = [];
    tasks.forEach((task) => {
      const existingTask = existingTasks.find(
        (existingTask) => existingTask.id === task.id,
      );
      if (existingTask) {
        updateTasks.push(task); // if task exists in database, add to updateTasks
      } else {
        newTasks.push(task); // if task does not exist in database, add to newTasks
      }
    });

    // insert all tasks
    const values = tasks.map((task) => {
      return `(${userId}, '${task.sortOrder}', '${task.message}')`;
    });
    const query = `INSERT INTO tasks ("userId", "sortOrder", "message") VALUES ${values.join(
      ', ',
    )} RETURNING *`;

    if (newTasks.length > 0) {
      await this.databaseService.executeQuery(query, []);
    }

    if (updateTasks.length > 0) {
      // update all tasks
      const updateValues = updateTasks.map((task) => {
        return `('${task.sortOrder}', '${task.message}')`;
      });

      // update all tasks
      await Promise.all(
        updateTasks.map(async (task) => {
          const updateQuery = `UPDATE tasks SET ("sortOrder", "message") = (${updateValues.join(
            ', ',
          )}) WHERE "userId" = ${userId} AND id = '${task.id}' RETURNING *`;

          await this.databaseService.executeQuery(updateQuery, []);
        }),
      );
    }
  }

  async editTaskById(userId: number, taskId: number, dto: EditTaskDto) {
    // get the task by id
    const task = await this.databaseService.executeQuery(
      'SELECT * FROM tasks WHERE id = $1',
      [taskId],
    );

    // check if user owns the task
    if (task.length === 0 || task[0].userId !== userId)
      throw new ForbiddenException('Access to resources denied');

    const setClause = Object.keys(dto)
      .map((key) => `"${key}" = '${dto[key]}'`)
      .join(', ');

    //update the task
    const updatedTask = await this.databaseService.executeQuery(
      `UPDATE tasks SET ${setClause} WHERE id = $1 RETURNING *`,
      [taskId],
    );

    return updatedTask;
  }

  async moveTask(userId: number, taskId: number, newPosition: number) {
    const order = await this.databaseService.executeQuery(
      'SELECT "sortOrder" FROM tasks WHERE "id" = $1',
      [taskId],
    );
    const oldPosition = order[0].sortOrder;

    // update the sortOrder for increment position
    if (newPosition > oldPosition) {
      await this.databaseService.executeQuery(
        `UPDATE tasks
        SET "sortOrder" = "sortOrder" - 1
        WHERE "userId" = $1
          AND "sortOrder" > $2
          AND "sortOrder" <= $3`,
        [userId, oldPosition, newPosition],
      );

      const tasks = await this.databaseService.executeQuery(
        `UPDATE tasks
        SET "sortOrder" = $1
        WHERE id = $2
        RETURNING *`,
        [newPosition, taskId],
      );

      return tasks;
    } else {
      // update the sortOrder for decrement position
      await this.databaseService.executeQuery(
        `UPDATE tasks
        SET "sortOrder" = "sortOrder" + 1
        WHERE "userId" = $1
          AND "sortOrder" < $2
          AND "sortOrder" >= $3`,
        [userId, oldPosition, newPosition],
      );
      const tasks = await this.databaseService.executeQuery(
        `UPDATE tasks
        SET "sortOrder" = $1
        WHERE id = $2
        RETURNING *`,
        [newPosition, taskId],
      );

      return tasks;
    }
  }
}
