import { CarsListQueryDto } from '../req/cars-list.query.dto';
import { ArticleListItemResDto } from './car-list-item.res.dto';

export class CarListResDto extends CarsListQueryDto {
  data: ArticleListItemResDto[];
  total: number;
}
