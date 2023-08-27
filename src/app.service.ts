import { Injectable } from '@nestjs/common';
import { ExternalDataService } from './external-data.service';
import { UsersDetailsDto } from './dto/userDto';

@Injectable()
export class AppService {
  constructor(private readonly externalDataService: ExternalDataService) {}

  async getUsersData(): Promise<UsersDetailsDto[]> {
    const userInfo = await this.externalDataService.getUsersInfo();
    const userDetail = await this.externalDataService.getUsersDetail();
    const mergedData = userInfo.reduce((acc, userInfoItem) => {
      const matchingDetail = userDetail.find(
        (object) => object.id === userInfoItem.id,
      );

      if (matchingDetail) {
        const mergedItem = { ...userInfoItem, ...matchingDetail };
        acc.push(mergedItem);
      }
      return acc;
    }, []);
    return mergedData;
  }

  async queryCreateFromUsersData(date: string): Promise<UsersDetailsDto[]> {
    const getUsersData = await this.getUsersData();
    const targetDate = new Date(date).getTime(); // 取得查詢日期的時間戳

    const createFromRes = getUsersData.filter((item) => {
      const itemTimestamp = new Date(item.createdAt).getTime(); // 取得資料中的日期的時間戳
      console.log(itemTimestamp);
      return itemTimestamp >= targetDate;
    });

    return createFromRes;
  }

  async queryCreateToUsersData(date: string): Promise<UsersDetailsDto[]> {
    const getUsersData = await this.getUsersData();
    const targetDate = new Date(date).getTime();

    const createFromRes = getUsersData.filter((item) => {
      const itemTimestamp = new Date(item.createdAt).getTime();
      return itemTimestamp <= targetDate;
    });

    return createFromRes;
  }

  async queryJobTypeUsersData(jobType: string): Promise<object> {
    const userInfo = await this.externalDataService.queryUserJobType(jobType);
    const userDetail = await this.externalDataService.getUsersDetail();
    const mergedData = userInfo.reduce((acc, userInfoItem) => {
      const matchingDetail = userDetail.find(
        (object) => object.id === userInfoItem.id,
      );
      if (matchingDetail) {
        const mergedItem = { ...userInfoItem, ...matchingDetail };
        acc.push(mergedItem);
      }
      return acc;
    }, []);
    return mergedData;
  }
}
