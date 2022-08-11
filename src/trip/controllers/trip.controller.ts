import { Controller, Post, Body } from '@nestjs/common';
import { TripPost } from '../dto/create-trip.dto';
import { TripService } from '../services/trip.service';
import { TripEntity } from '../../models/post.entity';

@Controller()
export class TripController {
  constructor(private tripService: TripService) {}
  @Post('trips')
  create(@Body() tripPost: TripPost & TripEntity): Promise<TripPost> {
    return this.tripService.createPost(tripPost);
  }
}
