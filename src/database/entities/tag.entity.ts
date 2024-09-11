import { Column, Entity, ManyToMany, VirtualColumn } from 'typeorm';

import { TableNameEnum } from './enums/table-name.enum';
import { CreateUpdateModel } from './models/create-update.model';
import { CarEntity } from './car.entity';

@Entity(TableNameEnum.TAGS)
export class TagEntity extends CreateUpdateModel {
  @Column('text', { unique: true })
  name: string;

  @VirtualColumn({ query: () => 'NULL' })
  carsCount?: number;

  @ManyToMany(() => CarEntity, (entity) => entity.tags)
  cars?: CarEntity[];
}
