import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { TagEntity } from '../../../database/entities/tag.entity';

@Injectable()
export class TagRepository extends Repository<TagEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(TagEntity, dataSource.manager);
  }

  public async getPopular(): Promise<TagEntity[]> {
    const qb = this.createQueryBuilder('tag');
    qb.leftJoin('tag.cars', 'car');
    qb.addSelect('COUNT(car.id)', 'tag_carCount');
    qb.groupBy('tag.id');
    qb.orderBy('"tag_carCount"', 'DESC');
    qb.limit(10);

    return await qb.getMany();
  }
}
