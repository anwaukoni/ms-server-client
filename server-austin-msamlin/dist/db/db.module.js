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
var DatabaseModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
const constants_1 = require("../constants");
const config_1 = require("@nestjs/config");
const db_service_1 = require("./db.service");
const core_1 = require("@nestjs/core");
const databasePoolFactory = async (configService) => {
    return new pg_1.Pool({
        user: configService.get('DB_USERNAME'),
        host: configService.get('DB_HOST'),
        database: configService.get('DB_NAME'),
        password: configService.get('DB_PASSWORD'),
        port: configService.get('DB_PORT'),
    });
};
let DatabaseModule = DatabaseModule_1 = class DatabaseModule {
    constructor(moduleRef) {
        this.moduleRef = moduleRef;
        this.logger = new common_1.Logger(DatabaseModule_1.name);
    }
    onApplicationShutdown(signal) {
        this.logger.log(`Shutting down on signal ${signal}`);
        const pool = this.moduleRef.get(constants_1.DB_CONNECTION);
        return pool.end();
    }
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = DatabaseModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [config_1.ConfigModule],
        providers: [
            {
                provide: constants_1.DB_CONNECTION,
                inject: [config_1.ConfigService],
                useFactory: databasePoolFactory,
            },
            db_service_1.DatabaseService,
        ],
        exports: [db_service_1.DatabaseService],
    }),
    __metadata("design:paramtypes", [core_1.ModuleRef])
], DatabaseModule);
//# sourceMappingURL=db.module.js.map