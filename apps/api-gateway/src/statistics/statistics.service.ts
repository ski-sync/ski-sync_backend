import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { LogActivityDto, GetUserStatsDto, ActivityResponseDto } from '@shared/dto/statistics.dto';
import { StatisticsMessagePattern } from '@shared/interfaces/message-patterns.interface';

@Injectable()
export class StatisticsService {
  constructor(
    @Inject('STATISTICS_SERVICE') private readonly statisticsClient: ClientProxy,
  ) {}

  async logActivity(logActivityDto: LogActivityDto): Promise<ActivityResponseDto> {
    return firstValueFrom(
      this.statisticsClient.send<ActivityResponseDto, LogActivityDto>(
        StatisticsMessagePattern.LOG_ACTIVITY,
        logActivityDto,
      ),
    );
  }

  async getUserStats(getUserStatsDto: GetUserStatsDto): Promise<any> {
    return firstValueFrom(
      this.statisticsClient.send<any, GetUserStatsDto>(
        StatisticsMessagePattern.GET_USER_STATS,
        getUserStatsDto,
      ),
    );
  }

  async getSystemStats(): Promise<any> {
    return firstValueFrom(
      this.statisticsClient.send<any, {}>(
        StatisticsMessagePattern.GET_SYSTEM_STATS,
        {},
      ),
    );
  }
} 