import { Module } from '@nestjs/common';
import { GeojsonController } from './geojson.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { 
          expiresIn: configService.get<string>('JWT_EXPIRES_IN')
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [GeojsonController],
  providers: [JwtAuthGuard],
})
export class GeojsonModule {} 