import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('API VDT Hub B2B')
    .setDescription(
      'API feita com propósito para integraçao de empresas para nossos serviços de chamada de taxista',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  return SwaggerModule.setup('v1/docs', app, document);
}
