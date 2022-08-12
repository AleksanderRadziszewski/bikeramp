import { Controller, Get } from '@nestjs/common';
import { StatsWeekService } from '../services/stats-week.service';
import { summaryWeek } from '../../common/interfaces/summaryWeek.interfaces';

@Controller('stats')
export class StatsController {
  constructor(private tripService: StatsWeekService) {}
  @Get('weekly')
  getStats(): Promise<summaryWeek> {
    return this.tripService.getStatsWeek();
  }
}
