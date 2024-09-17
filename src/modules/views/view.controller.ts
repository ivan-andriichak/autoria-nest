import { Controller, Get, Param, Post } from '@nestjs/common';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { ViewService } from './view.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Views')
@Controller('views')
export class ViewController {
  constructor(private readonly viewService: ViewService) {}

  @Get(':carId')
  async getViews(@Param('carId') carId: string): Promise<number> {
    return await this.viewService.getViews(carId);
  }

  @Get('statistics/:carId')
  async getCarStatistics(
    @Param('carId') carId: string,
    @CurrentUser() userData: IUserData,
  ): Promise<any> {
    return await this.viewService.getCarStatistics(userData, carId);
  }
}
