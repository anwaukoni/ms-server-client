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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const common_1 = require("@nestjs/common");
const decorator_1 = require("../auth/decorator");
const guard_1 = require("../auth/guard");
const task_service_1 = require("./task.service");
const dto_1 = require("./dto");
let TaskController = class TaskController {
    constructor(taskService) {
        this.taskService = taskService;
    }
    getTasks(userId) {
        return this.taskService.getTasks(userId);
    }
    getTaskById(userId, taskId) {
        console.log('userId', userId);
        console.log('taskId', taskId);
        return this.taskService.getTaskById(userId, taskId);
    }
    createTask(userId, dto) {
        return this.taskService.createTask(userId, dto);
    }
    createTasks(userId, dto) {
        return this.taskService.createTasks(userId, dto);
    }
    editTaskById(userId, taskId, dto) {
        return this.taskService.editTaskById(userId, taskId, dto);
    }
    moveTask(userId, taskId, newPosition) {
        return this.taskService.moveTask(userId, taskId, newPosition);
    }
};
exports.TaskController = TaskController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, decorator_1.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "getTasks", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, decorator_1.GetUser)('id')),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "getTaskById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, decorator_1.GetUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.CreateTaskDto]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "createTask", null);
__decorate([
    (0, common_1.Post)('batch'),
    __param(0, (0, decorator_1.GetUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Array]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "createTasks", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, decorator_1.GetUser)('id')),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, dto_1.EditTaskDto]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "editTaskById", null);
__decorate([
    (0, common_1.Put)(':id/move'),
    __param(0, (0, decorator_1.GetUser)('id')),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)('newPosition', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "moveTask", null);
exports.TaskController = TaskController = __decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Controller)('tasks'),
    __metadata("design:paramtypes", [task_service_1.TaskService])
], TaskController);
//# sourceMappingURL=task.controller.js.map