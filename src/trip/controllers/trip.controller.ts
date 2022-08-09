import { Controller, Post, Body } from '@nestjs/common';
import { TripPost } from '../dto/create-trip.dto';
import { TripService } from '../services/trip.service';
import { TripPostEntity } from '../models/post.entity';

@Controller('trips')
export class TripController {
  constructor(private tripService: TripService) {}
  @Post()
  create(@Body() tripPost: TripPost): Promise<TripPost & TripPostEntity> {
    return this.tripService.createPost(tripPost);
  }
}
