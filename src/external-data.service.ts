import { Injectable } from '@nestjs/common';
import axios from 'axios'; // 假設你使用 axios 進行 API 請求
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
    // id, name ,jobType
    const userInfo = await axios.get(
      'https://64d5e658754d3e0f13614839.mockapi.io/api/users',
    );
    // console.log(userInfo.data);
    return userInfo.data;
  }

  async queryUserJobType(param: string): Promise<UsersInfoDto[]> {
    // id, name ,jobType
    console.log('param', param);
    const userInfo = await axios.get(
      `https://64d5e658754d3e0f13614839.mockapi.io/api/users?jobType=${param}`,
    );
    return userInfo.data;
  }

  async getUsersDetail(): Promise<UsersDetailsDto[]> {
    // users個人資料
    const usersDetail = await axios.get(
      'https://64d5e658754d3e0f13614839.mockapi.io/api/user-detail',
    );
    // console.log(usersDetail.data);
    return usersDetail.data;
  }
}
