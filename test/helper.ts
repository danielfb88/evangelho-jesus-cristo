import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'reflect-metadata';
import { Connection, createConnection } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

let masterConn: Connection;

let app: INestApplication;
let _module: TestingModule;

const databaseName = 'ejc_db_test';

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
};

beforeAll(async (done) => {
  await createDatabase();

  _module = await Test.createTestingModule({
    imports: [
      TypeOrmModule.forRoot({
        ...config,
        entities: [__dirname + '/../src/**/*.entity.js'],
        autoLoadEntities: true,
        database: databaseName,
        synchronize: false,
        logging: false,
        dropSchema: true,
        migrations: ['dist/src/migrations/*.js'],
        migrationsRun: true,
      }),
    ],
  }).compile();

  _module.useLogger(false);

  app = _module.createNestApplication();
  await app.init();
  done();
});

afterAll(async () => {
  await masterConn.close();
  await app.close();
});

export async function getModule(): Promise<TestingModule> {
  return _module;
}

async function createDatabase(): Promise<void> {
  try {
    masterConn = await createConnection({
      name: 'master',
      ...(config as PostgresConnectionOptions),
    });

    await masterConn.query(`CREATE DATABASE ${databaseName};`);
  } catch (err) {
    if (!err.message.includes('already exists')) {
      process.stderr.write(`${err}\n${err.stack}\n`);
      process.exit(1);
    }
  }
}
