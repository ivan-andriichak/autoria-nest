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
      qb.andWhere(`
      (CONCAT(car.make, ' ', car.model) ILIKE :search
      OR tag.name ILIKE :search)
    `);
      qb.setParameter('search', `%${query.search}%`);
    }

    if (query.tag) {
      qb.andWhere('tag.name = :tag', { tag: query.tag });
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
