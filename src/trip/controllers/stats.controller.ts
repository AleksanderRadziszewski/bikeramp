import { Controller, Get } from '@nestjs/common';
import { StatsService } from '../services/stats.service';
import { summaryWeek } from '../../common/interfaces/summaryWeek.interfaces';

@Controller('stats')
export class StatsController {
  constructor(private tripService: StatsService) {}
  @Get('weekly')
  getStats(): Promise<summaryWeek> {
    return this.tripService.getStatsWeek();
  }
}
