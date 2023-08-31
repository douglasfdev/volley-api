import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { setupSwagger } from './docs/swagger.config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { config } from 'dotenv';
import { getEnvPath } from '@helpers/env.helper';
import log from 'src/common/utils/nodeEnv.util';

const envFilePath = getEnvPath(`${__dirname}/../common/envs`);
config({ path: envFilePath });

(async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.enableCors();

  app.use(helmet());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  setupSwagger(app);

  await app.listen(process.env.PORT || 5555, () => {
    log();
  });
})();
