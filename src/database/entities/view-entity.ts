import { Column, Entity } from 'typeorm';

// import { CarEntity } from './car.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { CreateUpdateModel } from './models/create-update.model';

@Entity(TableNameEnum.VIEW)
export class ViewEntity extends CreateUpdateModel {
  // @ManyToOne(() => CarEntity, (car) => car.views)
  // car: CarEntity;

  @Column({ type: 'integer', default: 1 })
  views: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lastUpdated: Date;
}
