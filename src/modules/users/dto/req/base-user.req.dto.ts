import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsOptional, IsString, Length, Matches } from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';

export class BaseUserReqDto {

  @ApiProperty({
    description: 'The name of the user.',
    example: 'Clavdia Petrivna',
    maxLength: 50,
  })
  @IsOptional()
  @IsString()
  @Length(3, 50)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  name?: string;

  @ApiProperty({
    description: 'The bio of the user.',
    example: 'Software engineer with a passion for coding.',
    maxLength: 300,
  })
  @IsOptional()
  @IsString()
  @Length(0, 300)
  bio?: string;

  @ApiProperty({
    description: 'The URL of the user’s profile image.',
    example: 'https://example.com/user-profile.jpg',
    maxLength: 3000,
  })
  @IsOptional()
  @IsString()
  @Length(0, 3000)
  image?: string;

  @ApiProperty({
    example: 'test@gmail.com',
    description: 'The email address of the user.',
    maxLength: 300,
  })
  @IsString()
  @Length(0, 300)
  @Matches(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)
  email: string;

  @ApiProperty({
    example: '123qwe!@#QWE',
    description: 'The password of the user.',
    maxLength: 300,
  })
  @IsString()
  @Length(0, 300)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%_*#?&])[A-Za-z\d@$_!%*#?&]{8,}$/)
  password: string;
}
