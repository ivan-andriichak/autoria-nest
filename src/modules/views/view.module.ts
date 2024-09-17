import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { CarModule } from '../cars/car.module';
import { FileStorageModule } from '../file-storage/file-storage.module';
import { RedisModule } from '../redis/redis.module';
import { RepositoryModule } from '../repository/repository.module';
import { ViewController } from './view.controller';
import { ViewService } from './view.service';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    RedisModule,
    CarModule,
    RepositoryModule,

  ],
  controllers: [ViewController],
  providers: [ViewService, TasksService],
  exports: [ViewService],
})
export class ViewModule {}
