import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

import { Role } from '../../../../common/enums/role.enum';
import { TransformHelper } from '../../../../common/helpers/transform.helper';
import { AccountType } from '../../../../common/enums/account-name.enum';

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
    description: 'The telephone number of the user.',
    example: '+38(063) 255-98-00',
    maxLength: 20,
  })
  @IsOptional()
  @IsString()
  @Length(18, 20)
  @Matches(/^\+38\(\d{3}\) \d{3}-\d{2}-\d{2}$/, {
    message: 'Telephone number is not valid',
  })
  telephone: string;

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

  @ApiProperty({
    description: 'The role of the user.',
    example: 'seller',
  })
  @IsOptional()
  @IsString()
  role: Role;

  @ApiProperty({
    description: 'The account type of the user.',
    example: 'premium',
  })
  @IsOptional()
  @IsString()
  accountType?: AccountType;
}
