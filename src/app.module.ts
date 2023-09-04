import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getEnvPath } from './common/helpers/env.helper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from '@configs/typeorm.config';
import { EventsModule } from './modules/events/events.module';
import { PlayersModule } from './modules/players/players.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ChallengesModule } from './modules/challenges/challenges.module';

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
    PlayersModule,
    CategoriesModule,
    ChallengesModule,
  ],
  controllers: [],
})
export class AppModule {}
