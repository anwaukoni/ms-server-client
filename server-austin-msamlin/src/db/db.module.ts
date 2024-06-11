import { Global, Logger, Module, OnApplicationShutdown } from '@nestjs/common';
import { Pool } from 'pg';
import { DB_CONNECTION } from '../constants';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseService } from './db.service';
import { ModuleRef } from '@nestjs/core';

const databasePoolFactory = async (configService: ConfigService) => {
  return new Pool({
    user: configService.get('DB_USERNAME'),
    host: configService.get('DB_HOST'),
    database: configService.get('DB_NAME'),
    password: configService.get('DB_PASSWORD'),
    port: configService.get('DB_PORT'),
  });
};

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: DB_CONNECTION,
      inject: [ConfigService],
      useFactory: databasePoolFactory,
    },
    DatabaseService,
  ],
  exports: [DatabaseService],
})
export class DatabaseModule implements OnApplicationShutdown {
  private readonly logger = new Logger(DatabaseModule.name);

  constructor(private readonly moduleRef: ModuleRef) {}

  onApplicationShutdown(signal?: string): any {
    this.logger.log(`Shutting down on signal ${signal}`);
    const pool = this.moduleRef.get(DB_CONNECTION) as Pool;
    return pool.end();
  }
}
