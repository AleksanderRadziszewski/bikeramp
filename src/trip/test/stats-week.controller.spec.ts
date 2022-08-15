import { Test, TestingModule } from '@nestjs/testing';
import { StatsWeekRepository } from '../repositories/stats-week.repository';
import { StatsWeekController } from '../controllers/stats-week.controller';
import { StatsWeekService } from '../services/stats-week.service';
import { HttpModule } from '@nestjs/axios';

describe('StatsWeekController', () => {
  let statsWeekController: StatsWeekController;
  let statsWeekService: StatsWeekService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [StatsWeekController],
      providers: [
        StatsWeekService,
        {
          provide: StatsWeekRepository,
          useValue: {},
        },
      ],
    }).compile();

    statsWeekController = module.get<StatsWeekController>(StatsWeekController);
    statsWeekService = module.get<StatsWeekService>(StatsWeekService);
  });

  it('should be defined', () => {
    expect(statsWeekController).toBeDefined();
  });
  describe('getStatsWeek', () => {
    it('get successfull results', async () => {
      const result = {
        total_distance: '30 km',
        total_price: '40 PLN',
      };
      jest
        .spyOn(statsWeekService, 'getStatsWeek')
        .mockImplementation(() => Promise.resolve(result));
      expect(await statsWeekController.getStats()).toEqual(result);
    });
  });
});
