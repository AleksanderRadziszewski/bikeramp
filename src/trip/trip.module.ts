import { Module } from '@nestjs/common';
import { TripController } from './controllers/trip.controller';
import { TripService } from './services/trip.service';
import { TripEntity } from './models/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { StatsWeekService } from './services/stats-week.service';
import { StatsController } from './controllers/stats-week.controller';
import { StatsMonthService } from './services/stats-month.service';
import { StatsMonthController } from './controllers/stats-month.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TripEntity]), HttpModule],
  providers: [TripService, StatsWeekService, StatsMonthService],
  controllers: [TripController, StatsController, StatsMonthController],
  exports: [TripService],
})
export class TripModule {}
