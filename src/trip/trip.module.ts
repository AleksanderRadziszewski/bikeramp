import { Module } from '@nestjs/common';
import { TripController } from './controllers/trip.controller';
import { TripService } from './services/trip.service';
import { TripEntity } from './models/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { StatsService } from './services/stats.service';
import { StatsController } from './controllers/stats.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TripEntity]), HttpModule],
  providers: [TripService, StatsService],
  controllers: [TripController, StatsController],
  exports: [TripService],
})
export class TripModule {}
