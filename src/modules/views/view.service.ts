import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { AccountType } from '../../common/enums/account-name.enum';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { RedisService } from '../redis/redis.service';
import { CarRepository } from '../repository/services/car.repository';
import { ViewRepository } from '../repository/services/view.repository';

@Injectable()
export class ViewService {
  private readonly VIEW_EXPIRATION = 86400;

  constructor(
    private readonly redisService: RedisService,
    private readonly viewRepository: ViewRepository,
    private readonly carRepository: CarRepository,
  ) {}

  public async getCarStatistics(
    userData: IUserData,
    carId: string,
  ): Promise<any> {
    if (userData.accountType !== AccountType.PREMIUM) {
      throw new UnauthorizedException(
        'Access to statistics is allowed only for premium accounts',
      );
    }

    const car = await this.carRepository.findOneBy({ id: carId });
    if (!car) {
      throw new NotFoundException('Car not found');
    }

    const views = await this.getViews(carId);
    return { views };
  }

  public async getViews(carId: string): Promise<number> {
    return await this.redisService.getCarViews(carId);
  }

  public async syncViewsToDatabase(): Promise<void> {
    const keys = await this.redisService.keys('car:*:views');
    for (const key of keys) {
      const carId = key.split(':')[1];
      const views = await this.redisService.getCarViews(carId);
      if (views !== null) {
        await this.viewRepository.save({ carId, views });
        await this.redisService.deleteByKey(key);
      }
    }
  }
}
