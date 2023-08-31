import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getEnvPath } from './common/helpers/env.helper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from '@configs/typeorm.config';
import { EventsModule } from './modules/events/events.module';
import { VolleyballModule } from './modules/volleyball/volleyball.module';

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    EventsModule,
    VolleyballModule,
  ],
  controllers: [],
})
export class AppModule {}
