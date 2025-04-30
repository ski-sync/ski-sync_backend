import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('ApiGateway');
  try {
    const app = await NestFactory.create(AppModule);
    
    // Configuration globale de validation des DTO
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    );

    // Configuration CORS
    app.enableCors();
    
    // Préfixe global pour les routes API
    app.setGlobalPrefix('api');
    
    // Configuration Swagger
    const config = new DocumentBuilder()
      .setTitle('Ski-Sync API')
      .setDescription('API Documentation pour l\'application Ski-Sync')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
    
    // Récupération du port depuis les variables d'environnement
    const configService = app.get(ConfigService);
    const port = configService.get<number>('API_GATEWAY_PORT') || 3000;
    
    await app.listen(port);
    logger.log(`API Gateway is running on: http://localhost:${port}/api`);
    logger.log(`Swagger documentation available at: http://localhost:${port}/api/docs`);
  } catch (error) {
    logger.error(`Failed to start API Gateway: ${error.message}`);
    logger.error(error.stack);
  }
}
bootstrap(); 