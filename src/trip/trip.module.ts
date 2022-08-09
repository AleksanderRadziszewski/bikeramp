import { Module } from '@nestjs/common';
import { TripController } from './controllers/trip.controller';
import { TripService } from './services/trip.service';
import { TripEntity } from './models/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([TripEntity]), HttpModule],
  providers: [TripService],
  controllers: [TripController],
  exports: [TripService],
})
export class TripModule {}
