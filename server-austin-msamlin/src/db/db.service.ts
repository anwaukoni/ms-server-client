import {
  Injectable,
  //  Type
} from '@nestjs/common';
import { Inject, Logger } from '@nestjs/common';
import { Pool, QueryResult } from 'pg';
import { DB_CONNECTION } from 'src/constants';

@Injectable()
export class DatabaseService {
  private readonly logger = new Logger(DatabaseService.name);

  constructor(@Inject(DB_CONNECTION) private pool: Pool) {}

  executeQuery(queryText: string, values: any[] = []): Promise<any[]> {
    this.logger.debug(`Executing query: ${queryText} (${values})`);
    return this.pool.query(queryText, values).then((result: QueryResult) => {
      this.logger.debug(`Executed query, result size ${result.rows.length}`);
      return result.rows;
    });
  }
}
