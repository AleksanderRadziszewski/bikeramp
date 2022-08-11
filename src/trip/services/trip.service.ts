import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TripPostEntity } from '../models/post.entity';
import { TripPost } from '../dto/create-trip.dto';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { map, lastValueFrom } from 'rxjs';
import * as _ from 'lodash';

@Injectable()
export class TripService {
  constructor(
    @InjectRepository(TripPostEntity)
    private readonly tripPostRepository: Repository<TripPostEntity>,
    private readonly httpService: HttpService,
  ) {}

  async createPost(tripPost: TripPost): Promise<TripPost & TripPostEntity> {
    const distance_data = await lastValueFrom(
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
      _.get(distance_data, 'rows[0].elements[0].distance.value') / 1000;
    tripPost.distance = parseFloat(distance.toFixed(2));

    return this.tripPostRepository.save(tripPost);
  }
}
