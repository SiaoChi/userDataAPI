import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/api/users')
  getUserData(@Query() query: any): object {
    const { createFrom, createdTo, jobType, page } = query;
    const limit = 10;

    if (createFrom || createdTo || jobType) {
      const paginatedData = this.appService.queryUsersData(
        createFrom,
        createdTo,
        jobType,
        page,
        limit,
      );

      return paginatedData;
    }
    return this.appService.getUsersDataPag(page, limit);
  }
}
