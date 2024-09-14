import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse, ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { CarsListQueryDto } from './dto/req/cars-list.query.dto';
import { CreateCarReqDto } from './dto/req/create-car.req.dto';
import { UpdateCarReqDto } from './dto/req/update-car.req.dto';
import { CarResDto } from './dto/res/car.res.dto';
import { CarListResDto } from './dto/res/car-list.res.dto';
import { CarMapper } from './services/car.mapper';
import { CarService } from './services/car.service';

@ApiBearerAuth()
@ApiTags('Cars')
@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Roles(Role.BUYER, Role.SELLER, Role.MANAGER, Role.ADMIN)
  @ApiOkResponse({ description: 'List of found cars' })

  @ApiQuery({ name: 'search', required: false, description: 'Search query: make, model or tag' })

  @Get()
  public async getList(
    @CurrentUser() userData: IUserData,
    @Query() query: CarsListQueryDto,
  ): Promise<CarListResDto> {
    const [entities, total] = await this.carService.getList(userData, query);
    return CarMapper.toResponseListDTO(entities, total, query);
  }

  @Roles(Role.SELLER)
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Post()
  public async create(
    @CurrentUser() userData: IUserData,
    @Body() dto: CreateCarReqDto,
  ): Promise<CarResDto> {
    const result = await this.carService.create(userData, dto);
    return CarMapper.toResponseDTO(result);
  }

  @Roles(Role.BUYER, Role.SELLER, Role.MANAGER, Role.ADMIN)
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Get(':carId')
  public async getById(
    @CurrentUser() userData: IUserData,
    @Param('carId') carId: string,
  ): Promise<CarResDto> {
    const result = await this.carService.getById(userData, carId);
    return CarMapper.toResponseDTO(result);
  }

  @Roles(Role.SELLER, Role.ADMIN)
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Patch(':carId')
  public async updateCar(
    @CurrentUser() userData: IUserData,
    @Param('carId') carId: string,
    @Body() dto: UpdateCarReqDto,
  ): Promise<CarResDto> {
    return await this.carService.updateCar(userData, carId, dto);
  }

  @Roles(Role.SELLER, Role.ADMIN)
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Delete(':carId')
  public async delete(
    @CurrentUser() userData: IUserData,
    @Param('carId') carId: string,
  ): Promise<void> {
    await this.carService.delete(userData, carId);
  }
}
