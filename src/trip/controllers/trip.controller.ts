import { Controller, Post, Body } from '@nestjs/common';
import { TripPost } from '../dto/create-trip.dto';
import { TripService } from '../services/trip.service';
import { TripEntity } from '../models/post.entity';

@Controller('trips')
export class TripController {
  constructor(private tripService: TripService) {}
  @Post()
  create(@Body() tripPost: TripPost): Promise<TripPost & TripEntity> {
    return this.tripService.createPost(tripPost);
  }
}
