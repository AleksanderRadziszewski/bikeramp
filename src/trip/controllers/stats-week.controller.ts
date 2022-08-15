import { Controller, Get } from '@nestjs/common';
import { StatsWeekService } from '../services/stats-week.service';
import { SummaryWeek } from '../../common/interfaces/summaryWeek.interfaces';

@Controller('stats')
export class StatsWeekController {
  constructor(private tripService: StatsWeekService) {}
  @Get('weekly')
  async getStats(): Promise<SummaryWeek> {
    return this.tripService.getData();
  }
}
