import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { LogActivityDto, GetUserStatsDto } from '@shared/dto/statistics.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('log-activity')
  async logActivity(@Body() logActivityDto: LogActivityDto): Promise<any> {
    return this.statisticsService.logActivity(logActivityDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:userId')
  async getUserStats(@Param('userId') userId: string): Promise<any> {
    const getUserStatsDto: GetUserStatsDto = { userId };
    return this.statisticsService.getUserStats(getUserStatsDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('system')
  async getSystemStats(): Promise<any> {
    return this.statisticsService.getSystemStats();
  }
} 