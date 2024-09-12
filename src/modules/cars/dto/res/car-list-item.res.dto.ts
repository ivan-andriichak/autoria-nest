import { PickType } from '@nestjs/swagger';

import { BaseCarResDto } from './base-car.res.dto';

export class CarListItemResDto extends PickType(BaseCarResDto, [
  'id',
  'make',
  'model',
  'year',
  'price',
  'description',
  'tags',
  'user',
]) {}
