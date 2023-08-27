import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { ExternalDataService } from './external-data.service';
import { UsersDetailsDto } from './dto/userDto';

describe('AppService', () => {
  let appService: AppService;

  const mockExternalDataService = {
    getUsersInfo: jest.fn(),
    getUsersDetail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        { provide: ExternalDataService, useValue: mockExternalDataService },
      ],
    }).compile();

    appService = module.get<AppService>(AppService);
  });

  describe('getUsersDataPag', () => {
    it('should return paginated user data', async () => {
      const userInfo = [
        /* mock user info data */
      ];
      const userDetail = [
        /* mock user detail data */
      ];

      mockExternalDataService.getUsersInfo.mockResolvedValue(userInfo);
      mockExternalDataService.getUsersDetail.mockResolvedValue(userDetail);

      const page = '2';
      const limit = 10;

      const result = await appService.getUsersDataPag(page, limit);

      expect(result).toHaveLength(limit); // Verify the length of the returned array
      // Add more assertions to validate the structure/content of the returned data
    });
  });

  // Add more test cases for other methods in AppService
});
