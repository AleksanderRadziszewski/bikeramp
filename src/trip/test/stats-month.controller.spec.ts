import { Test, TestingModule } from '@nestjs/testing';
import { StatsMonthRepository } from '../repositories/stats-month.repository';
import { StatsMonthController } from '../controllers/stats-month.controller';
import { StatsMonthService } from '../services/stats-month.service';
import { HttpModule } from '@nestjs/axios';

describe('StatsMonthController', () => {
  let statsMonthController: StatsMonthController;
  let statsMonthService: StatsMonthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [StatsMonthController],
      providers: [
        StatsMonthService,
        {
          provide: StatsMonthRepository,
          useValue: {},
        },
      ],
    }).compile();

    statsMonthController =
      module.get<StatsMonthController>(StatsMonthController);
    statsMonthService = module.get<StatsMonthService>(StatsMonthService);
  });

  it('should be defined', () => {
    expect(statsMonthController).toBeDefined();
  });
  describe('getStatsMonth', () => {

    it('get successfull results', async () => {
      const result = [
        {
          day: 'Aug, 27th',
          total_distance: 4.27,
          avg_ride: 4.27,
          avg_price: 6.4,
        },
        {
          day: 'Aug, 23rd',
          total_distance: 7.26,
          avg_ride: 3.63,
          avg_price: 5.45,
        },
      ];
      jest
        .spyOn(statsMonthService, 'getStatsMonth')
        .mockImplementation(() => Promise.resolve(result));
      expect(await statsMonthController.getStats()).toEqual(result);
    });
  });
});
