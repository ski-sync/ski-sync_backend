import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { StatisticsService } from './statistics.service';
import { LogActivityDto, GetUserStatsDto, ActivityResponseDto } from '@shared/dto/statistics.dto';
import { StatisticsMessagePattern } from '@shared/interfaces/message-patterns.interface';

@Controller()
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @MessagePattern(StatisticsMessagePattern.LOG_ACTIVITY)
  async logActivity(logActivityDto: LogActivityDto): Promise<ActivityResponseDto> {
    return this.statisticsService.logActivity(logActivityDto);
  }

  @MessagePattern(StatisticsMessagePattern.GET_USER_STATS)
  async getUserStats(getUserStatsDto: GetUserStatsDto): Promise<any> {
    return this.statisticsService.getUserStats(getUserStatsDto);
  }

  @MessagePattern(StatisticsMessagePattern.GET_SYSTEM_STATS)
  async getSystemStats(): Promise<any> {
    return this.statisticsService.getSystemStats();
  }
} 