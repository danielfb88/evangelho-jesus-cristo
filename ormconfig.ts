/* Only for cli */
const isProduction = process.env.STAGE === 'prod';

const DB_HOST = isProduction ? process.env.DB_HOST : 'localhost';
const DB_PORT = isProduction ? process.env.DB_PORT : '5432';
const DB_USERNAME = isProduction ? process.env.DB_USERNAME : 'postgres';
const DB_PASSWORD = isProduction ? process.env.DB_PASSWORD : 'postgres';
const DB_DATABASE = isProduction ? process.env.DB_DATABASE : 'ejc_db';

module.exports = {
  ssl: isProduction,
  extra: {
    ssl: isProduction ? { rejectUnauthorized: false } : null,
  },
  type: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  entities: [__dirname + '/**/*.entity.js'],
  autoLoadEntities: false,
  synchronize: false,
  logging: false,
  cli: {
    migrationsDir: 'src/migrations',
  },
  migrations: ['dist/src/migrations/*.js'],
  migrationsRun: true,
};
