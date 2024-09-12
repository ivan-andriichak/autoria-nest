import { CarsListQueryDto } from '../req/cars-list.query.dto';
import { CarListItemResDto } from './car-list-item.res.dto';

export class CarListResDto extends CarsListQueryDto {
  data: CarListItemResDto[];
  total: number;
}
