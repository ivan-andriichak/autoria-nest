import { CarEntity } from '../../../database/entities/car.entity';
import { UserMapper } from '../../users/user.maper';
import { CarsListQueryDto } from '../dto/req/cars-list.query.dto';
import { CarResDto } from '../dto/res/car.res.dto';
import { CarListResDto } from '../dto/res/car-list.res.dto';
import { CarListItemResDto } from '../dto/res/car-list-item.res.dto';

export class CarMapper {
  public static toResponseListDTO(
    entities: CarEntity[],
    total: number,
    query: CarsListQueryDto,
  ): CarListResDto {
    return {
      data: entities.map(this.toResponseListItemDTO),
      total,
      ...query,
    };
  }

  public static toResponseListItemDTO(
    entity: CarEntity
  ): CarListItemResDto {
    return {
      id: entity.id,
      make: entity.make,
      model: entity.model,
      year: entity.year,
      price: entity.price,
      created: entity.created,
      description: entity.description,
      tags: entity.tags.map((tag) => tag.name),
      user: UserMapper.toResponseDTO(entity.user),
    };
  }

  public static toResponseDTO(entity: CarEntity): CarResDto {
    return {
      id: entity.id,
      make: entity.make,
      model: entity.model,
      year: entity.year,
      price: entity.price,
      color: entity.color,
      mileage: entity.mileage,
      fuelType: entity.fuelType,
      transmission: entity.transmission,
      engine: entity.engine,
      owners: entity.owners,
      image: entity.image,
      description: entity.description,
      created: entity.created,
      updated: entity.updated,
      tags: Array.isArray(entity.tags)
        ? entity.tags.map((tag) => tag.name)
        : [],
      user: entity.user ? UserMapper.toResponseDTO(entity.user) : undefined,
    };
  }
}
