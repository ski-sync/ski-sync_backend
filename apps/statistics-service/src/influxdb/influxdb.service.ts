import { Injectable, OnModuleInit } from '@nestjs/common';
import { InfluxDB, Point } from '@influxdata/influxdb-client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class InfluxDBService implements OnModuleInit {
  private client: InfluxDB;
  private org: string;
  private bucket: string;
  private token: string;

  constructor(private configService: ConfigService) {
    this.token = this.configService.get('INFLUXDB_TOKEN') || 'my-super-secret-auth-token';
    this.org = this.configService.get('INFLUXDB_ORG') || 'ski-sync-org';
    this.bucket = this.configService.get('INFLUXDB_BUCKET') || 'ski-sync-bucket';
  }

  onModuleInit() {
    const url = this.configService.get('INFLUXDB_URL') || 'http://localhost:8086';
    this.client = new InfluxDB({ url, token: this.token });
  }

  async writePoint(measurement: string, tags: Record<string, string>, fields: Record<string, any>) {
    const writeApi = this.client.getWriteApi(this.org, this.bucket);
    
    const point = new Point(measurement);
    
    // Add tags
    Object.entries(tags).forEach(([key, value]) => {
      point.tag(key, value);
    });
    
    // Add fields
    Object.entries(fields).forEach(([key, value]) => {
      if (typeof value === 'number') {
        point.floatField(key, value);
      } else if (typeof value === 'boolean') {
        point.booleanField(key, value);
      } else {
        point.stringField(key, String(value));
      }
    });
    
    writeApi.writePoint(point);
    await writeApi.close();
    
    return point;
  }

  async query(fluxQuery: string) {
    const queryApi = this.client.getQueryApi(this.org);
    
    return new Promise((resolve, reject) => {
      const results = [];
      
      queryApi.queryRows(fluxQuery, {
        next(row, tableMeta) {
          const result = tableMeta.toObject(row);
          results.push(result);
        },
        error(error) {
          reject(error);
        },
        complete() {
          resolve(results);
        },
      });
    });
  }
}
