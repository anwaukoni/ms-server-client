import { OnApplicationShutdown } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
export declare class DatabaseModule implements OnApplicationShutdown {
    private readonly moduleRef;
    private readonly logger;
    constructor(moduleRef: ModuleRef);
    onApplicationShutdown(signal?: string): any;
}
