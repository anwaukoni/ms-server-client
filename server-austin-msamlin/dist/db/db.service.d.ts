import { Pool } from 'pg';
export declare class DatabaseService {
    private pool;
    private readonly logger;
    constructor(pool: Pool);
    executeQuery(queryText: string, values?: any[]): Promise<any[]>;
}
