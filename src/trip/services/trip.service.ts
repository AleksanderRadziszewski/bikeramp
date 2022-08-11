import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TripEntity } from '../../models/post.entity';
import { TripPost } from '../dto/create-trip.dto';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { map, lastValueFrom } from 'rxjs';
import * as _ from 'lodash';

@Injectable()
export class TripService {
  constructor(
    @InjectRepository(TripEntity)
    private readonly tripRepository: Repository<TripEntity>,
    private readonly httpService: HttpService,
  ) {}

  async createPost(
    tripPost: TripPost & TripEntity,
  ): Promise<TripPost & TripEntity> {
    const distanceDurationData = await lastValueFrom(
      this.httpService
        .get(
          encodeURI(
            `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${tripPost.start_address}&destinations=${tripPost.destination_address}&key=${process.env.DISTANCE_ACCESS_KEY}`,
          ),
        )
        .pipe(
          map((axiosResponse: AxiosResponse) => {
            return axiosResponse.data;
          }),
        ),
    );
    const distance =
      _.get(distanceDurationData, 'rows[0].elements[0].distance.value') / 1000;

    const duration = _.get(
      distanceDurationData,
      'rows[0].elements[0].duration.value',
    );
    tripPost.distance = parseFloat(distance.toFixed(2));
    tripPost.duration = parseFloat(duration.toFixed(2));
    tripPost.price = parseFloat((distance * 3).toFixed(2));

    return this.tripRepository.save(tripPost);
  }
}
