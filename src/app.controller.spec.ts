import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersDetailsDto } from './dto/userDto';
import { ExternalDataService } from './external-data.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, ExternalDataService],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  describe('getUserData', () => {
    const mockUsersData: UsersDetailsDto[] = [
      {
        name: 'Mr. Jermaine Volkman',
        jobType: 'Agent',
        id: '1',
        createdAt: '2023-07-30T09:33:03.230Z',
        city: 'Lake Shaina',
        zipCode: '49081',
        address: '852 Gerhold Overpass',
        gender: 'M2F',
      },
      {
        name: 'Jason Beier',
        jobType: 'Strategist',
        id: '2',
        createdAt: '2022-09-18T14:21:44.115Z',
        city: 'Fort Ruben',
        zipCode: '34702-3516',
        address: '5332 Antoinette Courts',
        gender: 'Trigender',
      },
      {
        name: 'Bernadette Volkman',
        jobType: 'Liaison',
        id: '3',
        createdAt: '2023-05-02T04:42:33.223Z',
        city: 'Evieland',
        zipCode: '56813-2801',
        address: '989 Kunde Club',
        gender: 'Cis man',
      },
      {
        name: 'Luke Lueilwitz IV',
        jobType: 'Designer',
        id: '4',
        createdAt: '2022-09-07T02:40:41.612Z',
        city: 'Fort Tedcester',
        zipCode: '47969',
        address: '157 Harvey Drives',
        gender: 'Two* person',
      },
    ];

    it('should return all users data when no query params provided', async () => {
      jest
        .spyOn(appService, 'getUsersDataPag')
        .mockResolvedValue(mockUsersData);

      const result = await appController.getUserData({});
      expect(result).toEqual(mockUsersData);
    });

    it('should return filtered users data when query params provided', async () => {
      const mockFilteredData: UsersDetailsDto[] = [
        {
          name: 'Mr. Jermaine Volkman',
          jobType: 'Agent',
          id: '1',
          createdAt: '2023-07-30T09:33:03.230Z',
          city: 'Lake Shaina',
          zipCode: '49081',
          address: '852 Gerhold Overpass',
          gender: 'M2F',
        },
      ];
      const mockQuery = {
        createdTo: '2023-09-09',
        createFrom: '2021-01-10',
        jobType: 'Agent',
      };

      jest
        .spyOn(appService, 'queryUsersData')
        .mockResolvedValue(mockFilteredData);

      jest
        .spyOn(appService, 'getUsersDataPag')
        .mockResolvedValue(mockFilteredData);

      const result = await appController.getUserData(mockQuery);
      expect(result).toEqual(mockFilteredData);
    });
  });
});
