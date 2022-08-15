import { Module } from '@nestjs/common';
import { TripController } from './controllers/trip.controller';
import { TripEntity } from './models/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { StatsWeekController } from './controllers/stats-week.controller';
import { StatsMonthService } from './services/stats-month.service';
import { StatsMonthController } from './controllers/stats-month.controller';
import { TripService } from './services/trip.service';
import { GetDataService } from './services/get-data.service';
import { StatsWeekService } from './services/stats-week.service';

@Module({
  imports: [TypeOrmModule.forFeature([TripEntity]), HttpModule],
  providers: [TripService, StatsWeekService, StatsMonthService, GetDataService],
  controllers: [TripController, StatsMonthController, StatsWeekController],
  exports: [TripService],
})
export class TripModule {}
