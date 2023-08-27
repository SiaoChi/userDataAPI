import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExternalDataService } from './external-data.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ExternalDataService],
})
export class AppModule {}
