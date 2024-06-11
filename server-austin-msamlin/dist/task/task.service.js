"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const db_service_1 = require("../db/db.service");
let TaskService = class TaskService {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async getTasks(userId) {
        const tasks = await this.databaseService.executeQuery('SELECT * FROM tasks WHERE "userId" = $1 ORDER BY "sortOrder" ASC', [userId]);
        return tasks;
    }
    async getTaskById(userId, taskId) {
        const task = await this.databaseService.executeQuery('SELECT * FROM tasks WHERE id = $1 AND "userId" = $2', [taskId, userId]);
        return task;
    }
    async createTask(userId, dto) {
        const task = await this.databaseService.executeQuery('INSERT INTO tasks ("userId", "sortOrder", description) VALUES ($1, $2, $3) RETURNING *', [userId, dto.sortOrder, dto.message]);
        return task;
    }
    async createTasks(userId, tasks) {
        const existingTasks = await this.databaseService.executeQuery(`SELECT * FROM tasks WHERE "userId" = $1 AND id IN (${tasks
            .map((task) => `'${task.id}'`)
            .join(', ')})`, [userId]);
        const updateTasks = [];
        const newTasks = [];
        tasks.forEach((task) => {
            const existingTask = existingTasks.find((existingTask) => existingTask.id === task.id);
            if (existingTask) {
                updateTasks.push(task);
            }
            else {
                newTasks.push(task);
            }
        });
        const values = tasks.map((task) => {
            return `(${userId}, '${task.sortOrder}', '${task.message}')`;
        });
        const query = `INSERT INTO tasks ("userId", "sortOrder", "message") VALUES ${values.join(', ')} RETURNING *`;
        if (newTasks.length > 0) {
            await this.databaseService.executeQuery(query, []);
        }
        if (updateTasks.length > 0) {
            const updateValues = updateTasks.map((task) => {
                return `('${task.sortOrder}', '${task.message}')`;
            });
            await Promise.all(updateTasks.map(async (task) => {
                const updateQuery = `UPDATE tasks SET ("sortOrder", "message") = (${updateValues.join(', ')}) WHERE "userId" = ${userId} AND id = '${task.id}' RETURNING *`;
                await this.databaseService.executeQuery(updateQuery, []);
            }));
        }
    }
    async editTaskById(userId, taskId, dto) {
        const task = await this.databaseService.executeQuery('SELECT * FROM tasks WHERE id = $1', [taskId]);
        if (task.length === 0 || task[0].userId !== userId)
            throw new common_1.ForbiddenException('Access to resources denied');
        const setClause = Object.keys(dto)
            .map((key) => `"${key}" = '${dto[key]}'`)
            .join(', ');
        const updatedTask = await this.databaseService.executeQuery(`UPDATE tasks SET ${setClause} WHERE id = $1 RETURNING *`, [taskId]);
        return updatedTask;
    }
    async moveTask(userId, taskId, newPosition) {
        const order = await this.databaseService.executeQuery('SELECT "sortOrder" FROM tasks WHERE "id" = $1', [taskId]);
        const oldPosition = order[0].sortOrder;
        if (newPosition > oldPosition) {
            await this.databaseService.executeQuery(`UPDATE tasks
        SET "sortOrder" = "sortOrder" - 1
        WHERE "userId" = $1
          AND "sortOrder" > $2
          AND "sortOrder" <= $3`, [userId, oldPosition, newPosition]);
            const tasks = await this.databaseService.executeQuery(`UPDATE tasks
        SET "sortOrder" = $1
        WHERE id = $2
        RETURNING *`, [newPosition, taskId]);
            return tasks;
        }
        else {
            await this.databaseService.executeQuery(`UPDATE tasks
        SET "sortOrder" = "sortOrder" + 1
        WHERE "userId" = $1
          AND "sortOrder" < $2
          AND "sortOrder" >= $3`, [userId, oldPosition, newPosition]);
            const tasks = await this.databaseService.executeQuery(`UPDATE tasks
        SET "sortOrder" = $1
        WHERE id = $2
        RETURNING *`, [newPosition, taskId]);
            return tasks;
        }
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [db_service_1.DatabaseService])
], TaskService);
//# sourceMappingURL=task.service.js.map