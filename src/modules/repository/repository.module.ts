import { Global, Module } from '@nestjs/common';

import { CarRepository } from './services/car.repository';
import { RefreshTokenRepository } from './services/refresh-token.repository';
import { TagRepository } from './services/tag.repository';
import { UserRepository } from './services/user.repository';
// import { ViewRepository } from './services/view.repository';

const repositories = [
  CarRepository,
  RefreshTokenRepository,
  TagRepository,
  UserRepository,
  // ViewRepository
];
@Global()
@Module({
  imports: [],
  controllers: [],
  providers: repositories,
  exports: repositories,
})
export class RepositoryModule {}
