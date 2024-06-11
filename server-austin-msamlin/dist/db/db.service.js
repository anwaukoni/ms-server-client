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
var DatabaseService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const pg_1 = require("pg");
const constants_1 = require("../constants");
let DatabaseService = DatabaseService_1 = class DatabaseService {
    constructor(pool) {
        this.pool = pool;
        this.logger = new common_2.Logger(DatabaseService_1.name);
    }
    executeQuery(queryText, values = []) {
        this.logger.debug(`Executing query: ${queryText} (${values})`);
        return this.pool.query(queryText, values).then((result) => {
            this.logger.debug(`Executed query, result size ${result.rows.length}`);
            return result.rows;
        });
    }
};
exports.DatabaseService = DatabaseService;
exports.DatabaseService = DatabaseService = DatabaseService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_2.Inject)(constants_1.DB_CONNECTION)),
    __metadata("design:paramtypes", [pg_1.Pool])
], DatabaseService);
//# sourceMappingURL=db.service.js.map