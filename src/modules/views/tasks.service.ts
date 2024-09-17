import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ViewService } from './view.service';

@Injectable()
export class TasksService {
  constructor(private readonly viewService: ViewService) {}

  @Cron(CronExpression.EVERY_HOUR) // Виконується кожну годину
  async handleCron() {
    console.log('Running syncViewsToDatabase...');
    await this.viewService.syncViewsToDatabase();
    console.log('Sync completed.');
  }
}
