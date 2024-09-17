import { Column, Entity, OneToMany } from 'typeorm';

import { Role } from '../../common/enums/role.enum';
import { CarEntity } from './car.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { CreateUpdateModel } from './models/create-update.model';
import { RefreshTokenEntity } from './refresh-token.entity';
import { AccountType } from '../../common/enums/account-name.enum';

@Entity(TableNameEnum.USERS)
export class UserEntity extends CreateUpdateModel {
  @Column('text')
  name: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text', { select: false })
  password: string;

  @Column('text', { nullable: true })
  telephone: string;

  @Column('text', { nullable: true })
  image?: string;

  @OneToMany(() => CarEntity, (entity) => entity.user)
  cars?: CarEntity[];

  @OneToMany(() => RefreshTokenEntity, (entity) => entity.user)
  refreshTokens?: RefreshTokenEntity[];

  @Column({ type: 'enum', enum: Role, default: Role.BUYER })
  role: Role;

  @Column({ type: 'enum', enum: AccountType, default: AccountType.BASIC })
  accountType: AccountType;
}
