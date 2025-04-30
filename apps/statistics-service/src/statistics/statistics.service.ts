import { Injectable, Logger } from '@nestjs/common';
import { InfluxDBService } from '../influxdb/influxdb.service';
import { PrismaService } from '@shared/prisma/prisma.service';
import { LogActivityDto, GetUserStatsDto, ActivityResponseDto } from '@shared/dto/statistics.dto';

@Injectable()
export class StatisticsService {
  private readonly logger = new Logger(StatisticsService.name);

  constructor(
    private readonly influxDBService: InfluxDBService,
    private readonly prisma: PrismaService
  ) {}

  async logActivity(logActivityDto: LogActivityDto): Promise<ActivityResponseDto> {
    this.logger.log(`Logging activity for user ${logActivityDto.userId}`);
    const { userId, activity, details } = logActivityDto;
    const timestamp = logActivityDto.timestamp || new Date();
    
    try {
      // Stocker l'activité dans PostgreSQL avec Prisma
      const activityRecord = await this.prisma.activity.create({
        data: {
          userId,
          activity,
          details,
          timestamp,
        }
      });
      
      // Également stocker dans InfluxDB pour les analyses en temps réel
      await this.influxDBService.writePoint(
        'user_activity',
        { userId: userId.toString(), activity },
        {
          details: details || '',
          id: activityRecord.id,
          timestamp: timestamp.toISOString(),
        },
      );
      
      return activityRecord;
    } catch (error) {
      this.logger.error(`Error logging activity: ${error.message}`, error.stack);
      throw error;
    }
  }

  async getUserStats(getUserStatsDto: GetUserStatsDto): Promise<any> {
    this.logger.log(`Getting stats for user ${getUserStatsDto.userId}`);
    const { userId, startDate, endDate } = getUserStatsDto;
    
    try {
      // Récupérer les données de Prisma
      const activities = await this.prisma.activity.findMany({
        where: {
          userId,
          timestamp: {
            gte: startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            lte: endDate || new Date(),
          },
        },
      });
      
      // Agréger les activités par type
      const activityCounts = {};
      activities.forEach(activity => {
        if (!activityCounts[activity.activity]) {
          activityCounts[activity.activity] = 0;
        }
        activityCounts[activity.activity]++;
      });
      
      return {
        userId,
        startDate: startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        endDate: endDate || new Date(),
        activityCounts,
        totalActivities: activities.length,
      };
    } catch (error) {
      this.logger.error(`Error getting user stats: ${error.message}`, error.stack);
      throw error;
    }
  }

  async getSystemStats(): Promise<any> {
    this.logger.log('Getting system stats');
    // Date il y a 30 jours
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    
    try {
      // Obtenir les statistiques du système à partir de Prisma
      const activities = await this.prisma.activity.findMany({
        where: {
          timestamp: {
            gte: thirtyDaysAgo,
          },
        },
      });
      
      // Agréger les activités par type
      const activityCounts = {};
      activities.forEach(activity => {
        if (!activityCounts[activity.activity]) {
          activityCounts[activity.activity] = 0;
        }
        activityCounts[activity.activity]++;
      });
      
      // Compter les utilisateurs uniques
      const userIds = new Set(activities.map(a => a.userId));
      
      return {
        period: '30 days',
        uniqueUsers: userIds.size,
        totalActivities: activities.length,
        activityBreakdown: activityCounts,
      };
    } catch (error) {
      this.logger.error(`Error getting system stats: ${error.message}`, error.stack);
      throw error;
    }
  }
} 