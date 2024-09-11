import { ApiProperty } from '@nestjs/swagger';
import { UserResDto } from '../../../users/dto/res/user.res.dto';

export class BaseCarResDto {
  @ApiProperty({
    example: '796cea24-a328-4463-a5e1-85a779e4780f',
    description: 'Unique identifier for the car.',
  })
  id: string;

  @ApiProperty({
    example: 'BMW',
    description: 'Car make or brand.',
  })
  make: string;

  @ApiProperty({
    example: 'X5',
    description: 'Car model.',
  })
  model: string;

  @ApiProperty({
    example: 2021,
    description: 'Year the car was manufactured.',
    required: false,
  })
  year: number;

  @ApiProperty({
    example: 50000,
    description: 'Car price.',
  })
  price: number;

  @ApiProperty({
    example: 'Black',
    description: 'Color of the car.',
    required: false,
  })
  color?: string;

  @ApiProperty({
    example: 5000,
    description: 'Mileage of the car in kilometers.',
    required: false,
  })
  mileage?: number;

  @ApiProperty({
    example: 'Petrol',
    description: 'Type of fuel the car uses.',
    required: false,
  })
  fuelType?: string;

  @ApiProperty({
    example: 'Automatic',
    description: 'Type of transmission in the car.',
    required: false,
  })
  transmission?: string;

  @ApiProperty({
    example: '3.0L V6',
    description: 'Type of engine in the car.',
    required: false,
  })
  engine?: string;

  @ApiProperty({
    example: 'https://example.com/car-image.jpg',
    description: 'URL of the car image.',
    required: false,
  })
  image: string;

  @ApiProperty({
    example: 1,
    description: 'Number of previous owners.',
    required: false,
  })
  owners?: number;

  @ApiProperty({
    example: 'This is a detailed description of the car, including its features, condition, and any special attributes.',
    description: 'Detailed description of the car.',
    required: false,
  })
  description?: string;

  @ApiProperty({
    example: '2021-09-29T10:00:00.000Z',
    description: 'Timestamp when the car was created.',
  })
  created: Date;

  @ApiProperty({
    example: '2021-09-29T10:00:00.000Z',
    description: 'Timestamp when the car was last updated.',
  })
  updated: Date;

  @ApiProperty({
    example: ['SUV', 'Luxury'],
    description: 'List of tags associated with the car.',
  })
  tags: string[];

  user?: UserResDto;
}
