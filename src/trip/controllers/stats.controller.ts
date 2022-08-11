import { Controller, Get } from '@nestjs/common';
import { StatsService } from '../services/stats.service';

@Controller('stats')
export class StatsController {
  constructor(private tripService: StatsService) {}
  @Get('weekly')
  getStats(): Promise<Record<string, unknown>> {
    return this.tripService.getStatsWeek();
  }
}
