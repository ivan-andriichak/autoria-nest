import { PickType } from '@nestjs/swagger';

import { BaseCarResDto } from './base-car.res.dto';

export class CarResDto extends PickType(BaseCarResDto, [
  'id',
  'make',
  'model',
  'year',
  'price',
  'color',
  'mileage',
  'fuelType',
  'transmission',
  'engine',
  'image',
  'owners',
  'description',
  'created',
  'updated',
  'tags',
  'user',
]) {}
