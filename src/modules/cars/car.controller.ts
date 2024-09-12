import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { CarRepository } from '../repository/services/car.repository';
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
  constructor(
    private readonly carService: CarService,
    private readonly carRepository: CarRepository,
  ) {}

  @ApiOkResponse({ description: 'List of cars' })
  @Get()
  public async getList(
    @CurrentUser() userData: IUserData,
    @Query() query: CarsListQueryDto,
  ): Promise<CarListResDto> {
    const [entities, total] = await this.carService.getList(userData,query);
    return CarMapper.toResponseListDTO(entities, total, query);
  }

  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Post()
  public async create(
    @CurrentUser() userData: IUserData,
    @Body() dto: CreateCarReqDto,
  ): Promise<CarResDto> {
    const result = await this.carService.create(userData, dto);
    return CarMapper.toResponseDTO(result);
  }

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
