import { Test, TestingModule } from '@nestjs/testing';
import { GetDataService } from '../services/get-data.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { TripPostDto } from '../dto/create-trip.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TripEntity } from '../models/post.entity';
import * as path from 'path';
import * as fs from 'fs';
import { of } from 'rxjs';
import * as axios from 'axios';

const TRIP_REPOSITORY_TOKEN = getRepositoryToken(TripEntity);

describe('GetDataService', () => {
  let getDataService: GetDataService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        GetDataService,
        {
          provide: TRIP_REPOSITORY_TOKEN,
          useValue: {},
        },
      ],
    }).compile();

    getDataService = module.get<GetDataService>(GetDataService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(getDataService).toBeDefined();
  });
  describe('getData', () => {
    const data = fs.readFileSync(
      path.join(process.cwd(), './src/trip/test/api-data.json'),
      { encoding: 'utf8' },
    );

    const createTrip: TripPostDto = {
      start_address: 'Marszałkowska 20,Warszawa,Polska',
      destination_address: 'Plac Europejski 2,Warszawa,Polska',
      price: 33.33,
    };

    const response: axios.AxiosResponse<any> = {
      data,
      headers: {},
      config: { url: 'http://localhost:3000/api/trips' },
      status: 200,
      statusText: 'OK',
    };

    it('get successfully data from an API', async () => {
      jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(response));
      getDataService.getData(createTrip).then((res) => {
        expect(res).toEqual(data);
      });
    });
  });
});
