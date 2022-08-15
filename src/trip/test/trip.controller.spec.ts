import { Test, TestingModule } from '@nestjs/testing';
import { TripController } from '../controllers/trip.controller';
import { TripService } from '../services/trip.service';
import { HttpModule } from '@nestjs/axios';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TripEntity } from '../models/post.entity';
import { GetDataService } from '../services/get-data.service';
import { Repository } from 'typeorm';
import { CreateTripDto } from '../dto/create-trip.dto';

describe('TripController', () => {
  let tripController: TripController;
  let tripRepository: Repository<TripEntity>;
  let tripService: TripService;

  const TRIP_REPOSITORY_TOKEN = getRepositoryToken(TripEntity);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [TripController],
      providers: [
        TripService,
        GetDataService,
        {
          provide: TRIP_REPOSITORY_TOKEN,
          useValue: {
            save: jest.fn((x) => x),
          },
        },
      ],
    }).compile();

    tripController = module.get<TripController>(TripController);
    tripRepository = module.get<Repository<TripEntity>>(TRIP_REPOSITORY_TOKEN);
    tripService = module.get<TripService>(TripService);
  });

  it('should be defined', () => {
    expect(tripController).toBeDefined();
  });
  it('tripRepository should be defined', () => {
    expect(tripRepository).toBeDefined();
  });

  describe('create', () => {
    const createTripDto: CreateTripDto = {
      start_address: 'Marszałkowska 20,Warszawa,Polska',
      destination_address: 'Plac Europejski 2,Warszawa,Polska',
      price: 33.33,
      duration: 44,
      distance: 40,
      price_ride: 20.5,
    };
    it('calls TripService', () => {
      const spy: jest.SpyInstance = jest.spyOn(tripService, 'createPost');
      tripController.create(createTripDto);
      expect(spy).toHaveBeenCalled();
    });
    it('should return new trip object', async () => {
      jest
        .spyOn(tripService, 'createPost')
        .mockImplementation(async () => createTripDto);
      expect(await tripController.create(createTripDto)).toBe(createTripDto);
    });
  });
});
