import { DatabaseService } from '../db/db.service';
import { AuthDto } from './dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private databaseService;
    private configService;
    private jwtService;
    constructor(databaseService: DatabaseService, configService: ConfigService, jwtService: JwtService);
    signup(dto: AuthDto): Promise<{
        access_token: string;
        user: any;
    }>;
    signin(dto: AuthDto): Promise<{
        access_token: string;
    }>;
    signToken(userId: number, email: string): Promise<string>;
}
