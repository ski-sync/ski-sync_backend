import { IsString, IsDate, IsOptional, IsUUID, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LogActivityDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'Identifiant unique de l\'utilisateur' })
  @IsUUID()
  userId: string;

  @ApiProperty({ example: 'ski', description: 'Type d\'activité (ex: ski, snowboard, etc.)' })
  @IsString()
  activity: string;

  @ApiPropertyOptional({ example: 'Ski alpin à Chamonix', description: 'Détails supplémentaires sur l\'activité' })
  @IsOptional()
  @IsString()
  details?: string;

  @ApiPropertyOptional({ example: '2025-04-09T12:00:00.000Z', description: 'Date et heure de l\'activité' })
  @IsOptional()
  @IsDate()
  timestamp?: Date;
}

export class GetUserStatsDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'Identifiant unique de l\'utilisateur' })
  @IsUUID()
  userId: string;

  @ApiPropertyOptional({ example: '2025-03-01T00:00:00.000Z', description: 'Date de début pour le filtrage des statistiques' })
  @IsOptional()
  @IsDate()
  startDate?: Date;

  @ApiPropertyOptional({ example: '2025-04-01T00:00:00.000Z', description: 'Date de fin pour le filtrage des statistiques' })
  @IsOptional()
  @IsDate()
  endDate?: Date;
}

export class ActivityResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'Identifiant unique de l\'activité' })
  id: string;
  
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'Identifiant unique de l\'utilisateur' })
  userId: string;
  
  @ApiProperty({ example: 'ski', description: 'Type d\'activité (ex: ski, snowboard, etc.)' })
  activity: string;
  
  @ApiPropertyOptional({ example: 'Ski alpin à Chamonix', description: 'Détails supplémentaires sur l\'activité' })
  details?: string;
  
  @ApiProperty({ example: '2025-04-09T12:00:00.000Z', description: 'Date et heure de l\'activité' })
  timestamp: Date;
} 