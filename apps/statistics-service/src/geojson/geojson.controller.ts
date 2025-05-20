import { Controller, Get, UseGuards, Res } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import * as fs from 'fs';
import * as path from 'path';
import { Response } from 'express';

@Controller('geojson')
export class GeojsonController {
  @MessagePattern('geojson.get')
  getGeojson() {
    try {
      // Chemin absolu pour le build, fallback pour le dev
      let filePath = path.join(process.cwd(), 'dist', 'apps', 'statistics-service', 'src', 'assets', 'stations.geojson');
      if (!fs.existsSync(filePath)) {
        filePath = path.join(process.cwd(), 'apps', 'statistics-service', 'src', 'assets', 'stations.geojson');
      }
      // Lecture du fichier
      const geojsonData = fs.readFileSync(filePath, 'utf8');
      
      // Parse et retourne le GeoJSON
      return JSON.parse(geojsonData);
    } catch (error) {
      console.error('Error reading GeoJSON file:', error);
      throw error;
    }
  }
} 