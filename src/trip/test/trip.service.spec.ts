import { Test, TestingModule } from '@nestjs/testing';
import { TripService } from '../services/trip.service';
import { Repository } from 'typeorm';
import { TripEntity } from '../models/post.entity';
import { TripPostDto } from '../dto/create-trip.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GetDataService } from '../services/get-data.service';
import { HttpModule } from '@nestjs/axios';
import * as _ from 'lodash';
import * as fs from 'fs';
import { GetTripDto } from '../dto/get-trip.dto';
import { join } from 'path';

describe('TripService', () => {
  let tripRepository: Repository<TripEntity>;
  let tripService: TripService;
  let getDataService: GetDataService;

  const TRIP_REPOSITORY_TOKEN = getRepositoryToken(TripEntity);

  beforeEach(async () => {
    jest.clearAllMocks;
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        TripService,
        {
          provide: TRIP_REPOSITORY_TOKEN,
          useValue: {
            save: jest.fn(),
          },
        },
        GetDataService,
      ],
    }).compile();

    tripService = module.get<TripService>(TripService);
    tripRepository = module.get<Repository<TripEntity>>(TRIP_REPOSITORY_TOKEN);
    getDataService = module.get<GetDataService>(GetDataService);
  });

  const tripPost: TripPostDto = {
    start_address: 'Marszałkowska 20,Warszawa,Polska',
    destination_address: 'Plac Europejski 2,Warszawa,Polska',
    price: 33.33,
    duration: 30,
    distance: 40,
    price_ride: 33,
  };

  it('should be defined', () => {
    expect(tripService).toBeDefined();
  });

  it('tripRepository should be defined', () => {
    expect(tripRepository).toBeDefined();
  });

  describe('createPOST', () => {
    it('POST response', async () => {
      const data: GetTripDto = JSON.parse(
        await fs.readFileSync(
          join(process.cwd(), './src/trip/test/api-data.json'),
          'utf8',
        ),
      );
      jest.spyOn(_, 'get');
      jest.spyOn(tripRepository, 'save');
      jest
        .spyOn(getDataService, 'getData')
        .mockImplementationOnce(() => Promise.resolve(data));
      await tripService.createPost(tripPost);
      expect(tripRepository.save).toHaveBeenCalledWith(tripPost);
    });
  });
});
