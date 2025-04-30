import { Module, Global } from '@nestjs/common';
import { InfluxDBService } from './influxdb.service';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [InfluxDBService],
  exports: [InfluxDBService],
})
export class InfluxDBModule {} 