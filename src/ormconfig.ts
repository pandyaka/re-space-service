import { ConnectionOptions } from 'typeorm';

const { PGHOST, PGPORT, PGUSER, PGPASSWORD, PGDATABASE } = process.env;

export = {
    type: 'postgres',
    host: PGHOST || 'localhost',
    port: PGPORT || 54320,
    username: PGUSER || 'test',
    password: PGPASSWORD || 'test',
    database: PGDATABASE || 'test',
    synchronize: false,
    logging: false,
    entities: ['src/entities/**/*.ts'],
    migrations: ['src/migrations/**/*.ts'],
    subscribers: ['src/subscriber/**/*.ts'],
    cli: {
        entitiesDir: 'src/entities',
        migrationsDir: 'src/migrations',
        subscribersDir: 'src/subscriber'
    }
} as ConnectionOptions;
