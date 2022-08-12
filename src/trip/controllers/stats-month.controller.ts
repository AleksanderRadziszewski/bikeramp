import { Controller, Get } from '@nestjs/common';
import { StatsMonthService } from '../services/stats-month.service';
import { summaryMonth } from '../../common/interfaces/summaryMonth.interfaces';

@Controller('stats')
export class StatsMonthController {
  constructor(private tripService: StatsMonthService) {}
  @Get('monthly')
  getStats(): Promise<summaryMonth[]> {
    return this.tripService.getStatsMonth();
  }
}
