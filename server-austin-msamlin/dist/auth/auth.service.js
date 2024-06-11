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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const db_service_1 = require("../db/db.service");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(databaseService, configService, jwtService) {
        this.databaseService = databaseService;
        this.configService = configService;
        this.jwtService = jwtService;
    }
    async signup(dto) {
        const userExists = await this.databaseService.executeQuery(`SELECT * FROM users WHERE email = '${dto.email}';`);
        if (userExists.length) {
            throw new common_1.ForbiddenException('Credentials already exists');
        }
        const user = await this.databaseService.executeQuery(`INSERT INTO users (email, hash) VALUES ('${dto.email}', '${dto.password}') RETURNING *;`);
        const token = await this.signToken(user[0].id, user[0].email);
        return { access_token: token, user: user[0] };
    }
    async signin(dto) {
        const user = await this.databaseService.executeQuery(`SELECT * FROM users WHERE email = '${dto.email}';`);
        if (!user.length) {
            throw new common_1.ForbiddenException('Invalid credentials');
        }
        if (user[0].hash !== dto.password) {
            throw new common_1.ForbiddenException('Invalid credentials');
        }
        const token = await this.signToken(user[0].id, user[0].email);
        return { access_token: token };
    }
    signToken(userId, email) {
        const payload = { sub: userId, email };
        const secret = this.configService.get('JWT_SECRET');
        const expiresIn = this.configService.get('JWT_EXPIRES_IN');
        return this.jwtService.signAsync(payload, { secret, expiresIn });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [db_service_1.DatabaseService,
        config_1.ConfigService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map