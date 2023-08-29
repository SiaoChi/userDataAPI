import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { ExternalDataService } from './external-data.service';

describe('AppService', () => {
  let appService: AppService;
  let externalDataService: ExternalDataService;

  const mockExternalDataService = {
    getUsersInfo: jest.fn(),
    getUsersDetail: jest.fn(),
    getUsersData: jest.fn(),
  };
  const mockAppService = {
    getUsersInfo: jest.fn(),
    getUsersDetail: jest.fn(),
    getUsersDataPag: jest.fn(),
    getUsersData: jest.fn(),
    queryUsersData: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: AppService, useValue: mockAppService },
        { provide: ExternalDataService, useValue: mockExternalDataService },
      ],
    }).compile();

    appService = module.get<AppService>(AppService);
    externalDataService = module.get<ExternalDataService>(ExternalDataService);
  });

  describe('AppService', () => {
    const userInfo = [
      {
        name: 'Mr. Jermaine Volkman',
        jobType: 'Agent',
        id: '1',
      },
      {
        name: 'Jason Beier',
        jobType: 'Strategist',
        id: '2',
      },
    ];
    const userDetail = [
      {
        id: '1',
        createdAt: '2023-07-30T09:33:03.230Z',
        city: 'Lake Shaina',
        zipCode: '49081',
        address: '852 Gerhold Overpass',
        gender: 'M2F',
      },
      {
        id: '2',
        createdAt: '2022-09-18T14:21:44.115Z',
        city: 'Fort Ruben',
        zipCode: '34702-3516',
        address: '5332 Antoinette Courts',
        gender: 'female',
      },
    ];

    const mergedData = [
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
        gender: 'female',
      },
    ];
    it('GetUsersDataPag()', async () => {
      mockAppService.getUsersDataPag.mockResolvedValue(mergedData);

      const getUsersInfoSpy = jest
        .spyOn(mockExternalDataService, 'getUsersInfo')
        .mockResolvedValue(userInfo);

      const getUsersDetailSpy = jest
        .spyOn(mockExternalDataService, 'getUsersDetail')
        .mockResolvedValue(userDetail);

      const page = '1';
      const limit = 2;

      const result = await appService.getUsersDataPag(page, limit);
      expect(result).toHaveLength(limit);
      expect(mockAppService.getUsersDataPag).toBeCalledWith(page, limit);
      expect(await externalDataService.getUsersInfo()).toBe(userInfo);
      expect(getUsersInfoSpy).toBeCalledTimes(1);
      expect(await externalDataService.getUsersDetail()).toBe(userDetail);
      expect(getUsersDetailSpy).toBeCalledTimes(1);
    });

    it('QueryUsersData()', async () => {
      const createdTo = '2023-09-09';
      const createFrom = '2020-01-10';
      const jobType = 'Agent';
      const page = '1';
      const limit = 1;

      const expectQueryResult = [
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

      const expectUserData = [
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
          gender: 'female',
        },
      ];
      const queryUsersDataSpy = jest
        .spyOn(mockAppService, 'queryUsersData')
        .mockResolvedValue(expectQueryResult);

      const getUserDataSpy = jest
        .spyOn(mockAppService, 'getUsersData')
        .mockResolvedValue(expectUserData);

      const result = await appService.queryUsersData(
        createdTo,
        createFrom,
        jobType,
        page,
        limit,
      );

      expect(result).toBe(expectQueryResult);
      expect(result).toHaveLength(limit);
      expect(queryUsersDataSpy).toBeCalledTimes(1);
      expect(await appService.getUsersData()).toBe(expectUserData);
      expect(getUserDataSpy).toBeCalledTimes(1);
    });
  });
});
