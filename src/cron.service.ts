import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class CronService {
  @Cron('*/1 * * * *') // Every minute
  handleCron() {
    console.log('This message will be logged every minute');
  }
}
