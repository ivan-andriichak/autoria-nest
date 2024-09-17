import { Module } from '@nestjs/common';

import { CarController } from './car.controller';
import { CarService } from './services/car.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarEntity } from '../../database/entities/car.entity';
import { ViewEntity } from '../../database/entities/view-entity';

@Module({
  controllers: [CarController],
  providers: [CarService],
  exports: [CarService],
})
export class CarModule {}
