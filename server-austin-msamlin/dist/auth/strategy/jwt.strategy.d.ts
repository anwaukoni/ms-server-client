import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { DatabaseService } from 'src/db/db.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private databaseService;
    constructor(config: ConfigService, databaseService: DatabaseService);
    validate(payload: {
        sub: number;
    }): Promise<any[]>;
}
export {};
