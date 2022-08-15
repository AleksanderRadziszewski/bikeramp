import { Controller, Get } from '@nestjs/common';
import { StatsMonthService } from '../services/stats-month.service';
import { SummaryMonth } from '../../common/interfaces/summaryMonth.interfaces';

@Controller('stats')
export class StatsMonthController {
  constructor(private statsMonthService: StatsMonthService) {}
  @Get('monthly')
  getStats(): Promise<any> {
    return this.statsMonthService.getStatsMonth();
  }
}
