import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (config: ConfigService): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'postgres',
      host: config.get('DB_HOST'),
      port: config.get<number>('DB_PORT'),
      username: config.get('POSTGRES_USER'),
      database: config.get('POSTGRES_DB'),
      password: config.get('POSTGRES_PASSWORD'),
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
      synchronize: true,
    };
  },
};

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  synchronize: false,
  logging: true,
};
