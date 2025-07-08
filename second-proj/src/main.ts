import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ErrorLogFilter } from './modules/error-log/error-log.filter';
import { ErrorLogService } from './modules/error-log/error-log.service';
import { SwaggerAuthMiddleware } from './middleware/SwaggerMiddleware';

import * as dotenv from 'dotenv';
dotenv.config(); // ⬅️

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Apply password protection before Swagger setup
  app.use('/api', new SwaggerAuthMiddleware().use); // Change '/api' to your Swagger path

  const config = new DocumentBuilder()
    .setTitle('Social Media Nest Apis')
    .setDescription('The post Api Description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  const errorLogsService = app.get(ErrorLogService);
  // applied on entire appliacation
  app.useGlobalFilters(new ErrorLogFilter(errorLogsService));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
