import { getEnvPath } from '../src/common/helpers/env.helper';
import { DataSource, DataSourceOptions } from 'typeorm';

import { config } from 'dotenv';

const envFilePath = getEnvPath(`${__dirname}/../common/envs`);
config({ path: envFilePath });

export const dataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: Number(process.env.DB_PORT),
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  migrations: ['dist/**/migrations/*.js'],
  entities: ['dist/**/*.entity.js'],
  synchronize: false, //never use true on production,
  migrationsRun: true,
  autoLoadEntites: true,
} as DataSourceOptions;

export const datatasource = new DataSource(dataSourceOptions);
