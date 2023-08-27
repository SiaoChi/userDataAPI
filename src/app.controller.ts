import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/api/users')
  getUserData(@Query() query: any): object {
    const { createFrom, createdTo, jobType } = query;
    // const paramToCheck = createFrom || createdTo || jobType;

    if (createFrom) {
      return this.appService.queryCreateFromUsersData(createFrom);
    }
    if (createdTo) {
      return this.appService.queryCreateToUsersData(createdTo);
    }
    if (jobType) {
      return this.appService.queryJobTypeUsersData(jobType);
    }
    return this.appService.getUsersData();
  }
}
