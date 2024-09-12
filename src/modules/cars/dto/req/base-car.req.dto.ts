import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';

export class BaseCarReqDto {
  @ApiProperty({
    description: 'The make of the car (e.g., Toyota, Ford).',
    example: 'Toyota',
    minLength: 3,
    maxLength: 20,
  })
  @IsString()
  @Length(3, 20)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  make: string;

  @ApiProperty({
    description: 'The model of the car (e.g., Camry, Focus).',
    example: 'Camry',
    minLength: 1,
    maxLength: 50,
  })
  @IsString()
  @Length(1, 50)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  model: string;

  @ApiProperty({
    description: 'The year the car was manufactured.',
    example: 2020,
    minimum: 1900,
  })
  @IsNumber()
  @Min(1900)
  @Type(() => Number)
  year: number;

  @ApiProperty({
    description: 'The price of the car in USD.',
    example: 30000,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  price: number;

  @ApiProperty({
    description: 'The color of the car.',
    example: 'Black',
    minLength: 3,
    maxLength: 20,
  })
  @IsOptional()
  @IsString()
  @Length(3, 20)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  color?: string;

  @ApiProperty({
    description: 'The mileage of the car in kilometers.',
    example: 15000,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  mileage?: number;

  @ApiProperty({
    description: 'The type of fuel the car uses (e.g., Gasoline, Diesel).',
    example: 'Gasoline',
    minLength: 3,
    maxLength: 20,
  })
  @IsOptional()
  @IsString()
  @Length(3, 20)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  fuelType?: string;

  @ApiProperty({
    description: 'The transmission type of the car (e.g., Automatic, Manual).',
    example: 'Automatic',
    minLength: 3,
    maxLength: 20,
  })
  @IsOptional()
  @IsString()
  @Length(3, 20)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  transmission?: string;

  @ApiProperty({
    description: 'The URL of the car’s image.',
    example: 'https://example.com/toyota-camry.jpg',
  })
  @IsString()
  @Transform(TransformHelper.trim)
  @Type(() => String)
  image: string;

  @ApiProperty({
    description: 'The number of previous owners of the car.',
    example: 1,
  })
  @IsNumber()
  @Type(() => Number)
  owners: number;

  @ApiProperty({
    description: 'A brief description of the car.',
    example: 'A well-maintained car with low mileage.',
    minLength: 0,
    maxLength: 300,
  })
  @IsString()
  @Length(0, 300)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  description: string;

  @ApiProperty({
    description: 'A list of tags associated with the car (e.g., sedan, reliable).',
    example: ['sedan', 'reliable', 'low-mileage'],
    maxItems: 5,
    minItems: 1,
  })
  @IsArray()
  @IsString({ each: true })
  @Length(3, 30, { each: true })
  @ArrayMaxSize(5)
  @Transform(TransformHelper.trimArray)
  @Transform(TransformHelper.uniqueItems)
  @Transform(TransformHelper.toLowerCaseArray)
  tags: string[];
}
