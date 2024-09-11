import { PickType } from '@nestjs/swagger';

import { BaseCarReqDto } from './base-car.req.dto';

export class CreateCarReqDto extends PickType(BaseCarReqDto, [
  'make',
  'model',
  'year',
  'price',
  'color',
  'mileage',
  'fuelType',
  'transmission',
  'image',
  'owners',
  'description',
  'tags',
]) {}
