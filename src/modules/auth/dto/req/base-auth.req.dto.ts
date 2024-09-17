import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { BaseUserReqDto } from '../../../users/dto/req/base-user.req.dto';

export class BaseAuthReqDto extends PickType(BaseUserReqDto, [
  'email',
  'password',
  'telephone',
  'image',
  'name',
  'role',
  'accountType'
]) {
  @ApiProperty({
    description: 'The unique device identifier.',
    example: 'device1',
  })
  @IsNotEmpty()
  @IsString()
  readonly deviceId: string;
}
