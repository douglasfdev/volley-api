import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('API de VolleyBall')
    .setDescription(
      'API Feita com propósito de aprendizado orientado a microsservices',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  return SwaggerModule.setup('v1/docs', app, document);
}
