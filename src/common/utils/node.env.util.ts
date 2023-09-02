import { config } from 'dotenv';
import { getEnvPath } from '@helpers/env.helper';
import { Logger } from '@nestjs/common';

const envFilePath = getEnvPath(`${__dirname}/../common/envs`);
config({ path: envFilePath });

const logger = new Logger();
export default function () {
  switch (process.env.NODE_ENV) {
    case 'development':
      logger.log(`ENV: ${process.env.NODE_ENV}`);
      logger.log(`PORT: ${process.env.PORT}`);
      logger.log(`HOST: ${process.env.HOST}:${process.env.PORT}/`);
      break;
    case 'local':
      logger.log(`ENV: ${process.env.NODE_ENV}`);
      logger.log(`PORT: ${process.env.PORT}`);
      logger.log(`HOST: ${process.env.HOST}:${process.env.PORT}/`);
      break;
    case 'production':
      logger.log(`HOST: ${process.env.HOST}/`);
      break;
    default:
      logger.log('Não existe variável de ambiente para esse ambiente');
  }
}
