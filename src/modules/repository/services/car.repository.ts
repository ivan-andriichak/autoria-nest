import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { CarEntity } from '../../../database/entities/car.entity';
import { CarsListQueryDto } from '../../cars/dto/req/cars-list.query.dto';

@Injectable()
export class CarRepository extends Repository<CarEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(CarEntity, dataSource.manager);
  }

  public async getList(
    userId: string,
    query: CarsListQueryDto,
  ): Promise<[CarEntity[], number]> {
    const qb = this.createQueryBuilder('car');

    qb.leftJoinAndSelect('car.tags', 'tag');
    qb.leftJoinAndSelect('car.user', 'user');

    qb.setParameter('userId', userId);

    if (query.search) {
      qb.andWhere('CONCAT(car.make, car.description) ILIKE :search');
      qb.setParameter('search', `%${query.search}%`);
    }

    if (query.tag) {
      qb.andWhere('tag.name = :tag');
      qb.setParameter('tag', query.tag);
    }

    qb.take(query.limit);
    qb.skip(query.offset);

    if (query.model) {
      qb.andWhere('car.model = :model');
      qb.setParameter('model', query.model);
    }

    if (query.year) {
      qb.andWhere('car.year = :year');
      qb.setParameter('year', query.year);
    }

    if (query.minPrice) {
      qb.andWhere('car.price >= :minPrice');
      qb.setParameter('minPrice', query.minPrice);
    }

    if (query.maxPrice) {
      qb.andWhere('car.price <= :maxPrice');
      qb.setParameter('maxPrice', query.maxPrice);
    }

    if (query.minMileage) {
      qb.andWhere('car.mileage >= :minMileage');
      qb.setParameter('minMileage', query.minMileage);
    }

    if (query.maxMileage) {
      qb.andWhere('car.mileage <= :maxMileage');
      qb.setParameter('maxMileage', query.maxMileage);
    }

    qb.take(query.limit);
    qb.skip(query.offset);

    return await qb.getManyAndCount();
  }

  public async getById(userId: string, carId: string): Promise<CarEntity> {
    const qb = this.createQueryBuilder('car');

    qb.leftJoinAndSelect('car.tags', 'tag');
    qb.leftJoinAndSelect('car.user', 'user');

    qb.andWhere('car.id = :carId', { carId });

    qb.andWhere('car.user_id = :userId', { userId });

    return await qb.getOneOrFail();
  }
}
