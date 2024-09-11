import { PickType } from '@nestjs/swagger';

import { BaseCarResDto } from './base-car.res.dto';

export class ArticleListItemResDto extends PickType(BaseCarResDto, [
  'id',
  'make',
  'model',
  'year',
  'price',
  'tags',
  'user',
]) {}
