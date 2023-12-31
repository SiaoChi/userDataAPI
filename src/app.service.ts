import { Injectable } from '@nestjs/common';
import { ExternalDataService } from './external-data.service';
import { UsersDetailsDto } from './dto/userDto';

@Injectable()
export class AppService {
  constructor(private readonly externalDataService: ExternalDataService) {}

  async getUsersDataPag(
    page: string,
    limit: number,
  ): Promise<UsersDetailsDto[]> {
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
    const pageNumber = page ? parseInt(page, 10) : 1;
    const startIndex = (pageNumber - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = mergedData.slice(startIndex, endIndex);

    return paginatedData;
  }

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

  async queryUsersData(
    createFrom: string | null,
    createdTo: string | null,
    jobType: string | null,
    page: string | null,
    limit: number,
  ): Promise<UsersDetailsDto[]> {
    const getUsersData = await this.getUsersData();
    let filteredData = getUsersData;

    if (createFrom !== undefined) {
      const createFromDate = new Date(createFrom).getTime();
      filteredData = filteredData.filter(
        (item) => new Date(item.createdAt).getTime() >= createFromDate,
      );
    }

    if (createdTo !== undefined) {
      const createdToDate = new Date(createdTo).getTime();
      filteredData = filteredData.filter(
        (item) => new Date(item.createdAt).getTime() <= createdToDate,
      );
    }

    if (jobType !== undefined) {
      filteredData = filteredData.filter((item) => item.jobType === jobType);
    }

    const pageNumber = page ? parseInt(page, 10) : 1;
    const startIndex = (pageNumber - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    return paginatedData;
  }
}
