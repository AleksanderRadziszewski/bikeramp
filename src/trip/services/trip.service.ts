import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TripEntity } from '../models/post.entity';
import { CreateTripDto, TripPostDto } from '../dto/create-trip.dto';
import { GetDataService } from '../services/get-data.service';
import * as _ from 'lodash';
import * as moment from 'moment';

@Injectable()
export class TripService {
  constructor(
    @InjectRepository(TripEntity)
    private readonly tripRepository: Repository<TripEntity>,
    private readonly getDataService: GetDataService,
  ) {}

  async createPost(tripPost: TripPostDto): Promise<CreateTripDto> {
    const data = await this.getDataService.getData(tripPost);
    const distance = _.get(data, 'rows[0].elements[0].distance.value') / 1000;
    const duration = _.get(data, 'rows[0].elements[0].duration.value');
    tripPost.distance = parseFloat(distance.toFixed(2));
    tripPost.duration = parseFloat(duration.toFixed(2));
    tripPost.price_ride = parseFloat((distance * 1.5).toFixed(2));
    tripPost.date = moment().format('MMM, Do');

    return this.tripRepository.save(tripPost);
  }
}
