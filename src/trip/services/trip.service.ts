import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TripPostEntity } from '../models/post.entity';
import { TripPost } from '../dto/create-trip.dto';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { map, lastValueFrom } from 'rxjs';

@Injectable()
export class TripService {
  constructor(
    @InjectRepository(TripPostEntity)
    private readonly tripPostRepository: Repository<TripPostEntity>,
    private readonly httpService: HttpService,
  ) {}

  async createPost(tripPost: TripPost): Promise<TripPost & TripPostEntity> {
    const start_address_data = await lastValueFrom(
      this.httpService
        .get(
          encodeURI(
            `http://api.positionstack.com/v1/forward?access_key=${process.env.MAPS_ACCESS_KEY}&query=${tripPost.start_address}&country_module=1`,
          ),
        )
        .pipe(
          map((axiosResponse: AxiosResponse) => {
            return axiosResponse.data;
          }),
        ),
    );

    const destination_address_data = await lastValueFrom(
      this.httpService
        .get(
          encodeURI(
            `http://api.positionstack.com/v1/forward?access_key=${process.env.MAPS_ACCESS_KEY}&query=${tripPost.destination_address}&country_module=1`,
          ),
        )
        .pipe(
          map((axiosResponse: AxiosResponse) => {
            return axiosResponse.data;
          }),
        ),
    );

    const [lat_start, lon_start] = [
      start_address_data.data[0].latitude,
      start_address_data.data[0].longitude,
    ];

    const [lat_dest, lon_dest] = [
      destination_address_data.data[0].latitude,
      destination_address_data.data[0].longitude,
    ];

    function calcCrow(lat_start, lon_start, lat_dest, lon_dest) {
      const R = 6371; // km
      const dLat = toRad(lat_dest - lat_start);
      const dLon = toRad(lon_dest - lon_start);
      const lat1 = toRad(lat_start);
      const lat2 = toRad(lat_dest);

      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) *
          Math.sin(dLon / 2) *
          Math.cos(lat1) *
          Math.cos(lat2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const d = R * c;
      return d;
    }

    function toRad(Value) {
      return (Value * Math.PI) / 180;
    }
    const distance = parseFloat(
      calcCrow(lat_start, lon_start, lat_dest, lon_dest).toFixed(2),
    );
    tripPost.distance = distance;

    return this.tripPostRepository.save(tripPost);
  }
}
