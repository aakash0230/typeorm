import { Controller, Get } from '@nestjs/common';
import { CronService } from './cron.service';

@Controller()
export class AppController {
  constructor(private readonly cronService: CronService) {}

  @Get('start-cron')
  startCron() {
    this.cronService.handleCron();
    return 'Cron job started';
  }
}
