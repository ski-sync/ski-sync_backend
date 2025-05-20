import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StatisticsModule } from './statistics/statistics.module';
import { PrismaModule } from '@shared/prisma/prisma.module';
import { GeojsonModule } from './geojson/geojson.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    StatisticsModule,
    GeojsonModule,
  ],
})
export class AppModule {} 