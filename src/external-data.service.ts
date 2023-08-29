import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { UsersDetailsDto, UsersInfoDto } from './dto/userDto';

@Injectable()
export class ExternalDataService {
  async getUsersDetailById(id: string): Promise<object> {
    // user個人資料
    const usersDetailById = await axios.get(
      `https://64d5e658754d3e0f13614839.mockapi.io/api/user-detail/${id}`,
    );
    return usersDetailById;
  }

  async getUsersInfo(): Promise<UsersInfoDto[]> {
    const userInfo = await axios.get(
      'https://64d5e658754d3e0f13614839.mockapi.io/api/users',
    );
    return userInfo.data;
  }

  async queryUserJobType(param: string): Promise<UsersInfoDto[]> {
    console.log('param', param);
    const userInfo = await axios.get(
      `https://64d5e658754d3e0f13614839.mockapi.io/api/users?jobType=${param}`,
    );
    return userInfo.data;
  }

  async getUsersDetail(): Promise<UsersDetailsDto[]> {
    const usersDetail = await axios.get(
      'https://64d5e658754d3e0f13614839.mockapi.io/api/user-detail',
    );
    return usersDetail.data;
  }
}
