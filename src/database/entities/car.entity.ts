import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { TableNameEnum } from './enums/table-name.enum';
import { CreateUpdateModel } from './models/create-update.model';
import { UserEntity } from './user.entity';
import { TagEntity } from './tag.entity';

@Entity(TableNameEnum.CARS)
export class CarEntity extends CreateUpdateModel {
  @Column({ type: 'varchar', length: 255 })
  make: string;

  @Column({ type: 'varchar', length: 255 })
  model: string;

  @Column({ type: 'integer', nullable: true })
  year: number;

  @Column({ type: 'numeric' })
  price: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  color?: string;

  @Column({ type: 'integer', nullable: true })
  mileage?: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  fuelType?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  transmission?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  engine?: string;

  @Column({ type: 'integer', nullable: true })
  horsepower?: number;

  @Column({ type: 'text', array: true, nullable: true })
  features?: string[];

  @Column({ type: 'integer', nullable: true })
  owners?: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  image: string;

  @Column('text')
  description?: string;

  @Column()
  user_id: string;

  @ManyToOne(() => UserEntity, (entity) => entity.cars)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @ManyToMany(() => TagEntity, (entity) => entity.cars)
  @JoinTable()
  tags?: TagEntity[];
}
