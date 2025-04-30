import { Module } from '@nestjs/common';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';
import { InfluxDBModule } from '../influxdb/influxdb.module';

@Module({
  imports: [InfluxDBModule],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class StatisticsModule {} 