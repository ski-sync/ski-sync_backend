import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('UserService');
  try {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    // Configuration de la validation globale
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    );

    // Configuration du microservice RabbitMQ
    const rabbitmqUrl = configService.get<string>('RABBITMQ_URL') || 'amqp://guest:guest@localhost:5672';
    const rabbitmqQueue = configService.get<string>('RABBITMQ_USER_QUEUE') || 'user_queue';
    
    logger.log(`Connecting to RabbitMQ at ${rabbitmqUrl}, queue: ${rabbitmqQueue}`);
    
    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.RMQ,
      options: {
        urls: [rabbitmqUrl],
        queue: rabbitmqQueue,
        queueOptions: {
          durable: false,
        },
        noAck: true,
      },
    });

    await app.startAllMicroservices();
    logger.log('Microservice started successfully');
    
    // Récupérer le port depuis la variable d'environnement
    const port = configService.get<number>('USER_SERVICE_PORT');
    await app.listen(port);
    logger.log(`User service is running on: ${await app.getUrl()}`);
  } catch (error) {
    logger.error(`Failed to start User Service: ${error.message}`);
    logger.error(error.stack);
  }
}
bootstrap(); 