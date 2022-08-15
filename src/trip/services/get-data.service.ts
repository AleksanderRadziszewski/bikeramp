import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map, lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { TripPostDto } from '../dto/create-trip.dto';
import { GetTripDto } from '../dto/get-trip.dto';

@Injectable()
export class GetDataService {
  constructor(private readonly httpService: HttpService) {}
  async getData(tripPost: TripPostDto): Promise<GetTripDto> {
    try {
      const data = await lastValueFrom(
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
      return data;
    } catch (err) {
      throw err;
    }
  }
}
