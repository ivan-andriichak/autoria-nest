import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { In } from 'typeorm';

import { CarEntity } from '../../../database/entities/car.entity';
import { TagEntity } from '../../../database/entities/tag.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { CarRepository } from '../../repository/services/car.repository';
import { TagRepository } from '../../repository/services/tag.repository';
import { CarsListQueryDto } from '../dto/req/cars-list.query.dto';
import { CreateCarReqDto } from '../dto/req/create-car.req.dto';
import { UpdateCarReqDto } from '../dto/req/update-car.req.dto';
import { CarMapper } from './car.mapper';
import { CarResDto } from '../dto/res/car.res.dto';

@Injectable()
export class CarService {
  constructor(
    private readonly tagRepository: TagRepository,
    private readonly carRepository: CarRepository,
  ) {}

  public async getList(
    userData: IUserData,
    query: CarsListQueryDto,
  ): Promise<[CarEntity[], number]> {
    return await this.carRepository.getList( userData.userId, query);
  }

  public async create(
    userData: IUserData,
    dto: CreateCarReqDto,
  ): Promise<CarEntity> {
    const tags = await this.createTags(dto.tags);

    return await this.carRepository.save(
      this.carRepository.create({
        ...dto,
        user_id: userData.userId,
        tags,
      }),
    );
  }

  public async getById(
    userData: IUserData,
    carId: string,
  ): Promise<CarEntity> {
    const car = await this.carRepository.getById(userData.userId, carId);
    if (car.user_id !== userData.userId) {
      throw new ForbiddenException('You do not have permission to view this car.');
    }

    return car;
  }

  public async updateCar(
    userData: IUserData,
    carId: string,
    dto: UpdateCarReqDto,
  ): Promise<CarResDto> {
    const car = await this.carRepository.getById(userData.userId, carId);
    if (car.user_id !== userData.userId) {
      throw new ForbiddenException('You do not have permission to update this car.');
    }
    await this.carRepository.update(carId, dto);

    const updatedCar = await this.carRepository.findOneBy({ id: carId });
    return CarMapper.toResponseDTO(updatedCar);
  }

  public async delete(
    userData: IUserData,
    carId: string,
  ): Promise<void> {
    await this.checkIsCarExistOrThrow(carId);
    const car = await this.carRepository.findOneBy({ id: carId });
    if (car.user_id !== userData.userId) {
      throw new ForbiddenException('You do not have permission to delete this car.');
    }
    await this.carRepository.delete(carId);
  }

  private async checkIsCarExistOrThrow(carId: string): Promise<void> {
    const car = await this.carRepository.findOneBy({ id: carId });
    if (!car) {
      throw new NotFoundException('Car not found');
    }
  }

  private async createTags(tags: string[]): Promise<TagEntity[]> {
    if (!tags || tags.length === 0) return [];

    const entities = await this.tagRepository.findBy({ name: In(tags) });
    const existingTags = entities.map((entity) => entity.name);
    const newTags = tags.filter((tag) => !existingTags.includes(tag));
    const newEntities = await this.tagRepository.save(
      newTags.map((tag) => this.tagRepository.create({ name: tag })),
    );
    return [...entities, ...newEntities];
  }
}
