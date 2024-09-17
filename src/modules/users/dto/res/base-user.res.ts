import { ApiProperty } from '@nestjs/swagger';

export class BaseUserResDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  telephone?: string;

  @ApiProperty()
  image?: string;

  @ApiProperty()
  role?: string;

  @ApiProperty()
  accountType?: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
