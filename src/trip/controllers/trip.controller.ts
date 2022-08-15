import { Controller, Post, Body } from '@nestjs/common';
import { CreateTripDto } from '../dto/create-trip.dto';
import { TripService } from '../services/trip.service';

@Controller()
export class TripController {
  constructor(private tripService: TripService) {}
  @Post('trips')
  create(@Body() tripPost: CreateTripDto): Promise<CreateTripDto> {
    return this.tripService.createPost(tripPost);
  }
}
