import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ViewEntity } from '../../../database/entities/view-entity';

@Injectable()
export class ViewRepository extends Repository<ViewEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ViewEntity, dataSource.manager);
  }
}
