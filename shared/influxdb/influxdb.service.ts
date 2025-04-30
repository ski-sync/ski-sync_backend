import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InfluxDB, Point } from '@influxdata/influxdb-client';

@Injectable()
export class InfluxDBService implements OnModuleInit {
  private influxDB: InfluxDB;
  private org: string;
  private bucket: string;
  private logger = new Logger(InfluxDBService.name);

  constructor(private configService: ConfigService) {
    const url = this.configService.get<string>('INFLUXDB_URL');
    const token = this.configService.get<string>('INFLUXDB_TOKEN');
    this.org = this.configService.get<string>('INFLUXDB_ORG');
    this.bucket = this.configService.get<string>('INFLUXDB_BUCKET');

    this.influxDB = new InfluxDB({
      url,
      token,
    });
  }

  async onModuleInit() {
    try {
      this.logger.log('Initializing InfluxDB connection...');
      // Vérifier la connexion en tentant d'écrire un point de test
      await this.writePoint('system', { type: 'startup' }, { message: 'Service started' });
      this.logger.log('InfluxDB connection established successfully');
    } catch (error) {
      this.logger.error(`Failed to connect to InfluxDB: ${error.message}`);
    }
  }

  async writePoint(measurement: string, tags: Record<string, string>, fields: Record<string, any>) {
    try {
      const writeApi = this.influxDB.getWriteApi(this.org, this.bucket, 'ns');
      const point = new Point(measurement);

      // Ajouter les tags
      Object.entries(tags).forEach(([key, value]) => {
        point.tag(key, value);
      });

      // Ajouter les champs
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
      return true;
    } catch (error) {
      this.logger.error(`Error writing to InfluxDB: ${error.message}`);
      throw error;
    }
  }

  async query(fluxQuery: string): Promise<any[]> {
    const queryApi = this.influxDB.getQueryApi(this.org);
    try {
      const result = await queryApi.collectRows(fluxQuery);
      return result;
    } catch (error) {
      this.logger.error(`Error querying InfluxDB: ${error.message}`);
      throw error;
    }
  }
} 