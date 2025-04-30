import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('StatisticsService');
  try {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    // Configuration du microservice RabbitMQ
    const rabbitmqUrl = configService.get<string>('RABBITMQ_URL');
    const rabbitmqQueue = configService.get<string>('RABBITMQ_STATISTICS_QUEUE');
    
    logger.log(`Connecting to RabbitMQ at ${rabbitmqUrl}, queue: ${rabbitmqQueue}`);
    
    const microservice = await NestFactory.createMicroservice(AppModule, {
      transport: Transport.RMQ,
      options: {
        urls: [rabbitmqUrl],
        queue: rabbitmqQueue,
        queueOptions: {
          durable: false,
        },
      },
    });

    await microservice.listen();
    logger.log('Statistics microservice is listening');
  } catch (error) {
    logger.error(`Failed to start Statistics Service: ${error.message}`);
    logger.error(error.stack);
  }
}
bootstrap(); 