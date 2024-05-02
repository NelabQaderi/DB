import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class UpdateInstructorDto {
  @ApiProperty({ example: 'Ali' })
  @ApiProperty({
    description:
      'instructor name',
    example: 'Ali',
  })
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiProperty({ example: 'Ahmad' })
  @ApiProperty({
    description: 'instructor father name',
    example: 'Ahmad',
  })
  @IsString()
  @IsNotEmpty()
  fathername?: string;

  @ApiProperty({ example: '0787311374' })
  @ApiProperty({
    description: 'instructor phone number',
    example: '0787311374',
  })
  @IsString()
  @IsNotEmpty()
  phone_number?: string;

  @ApiProperty({ example: 'ali@gmail.com' })
  @ApiProperty({
    description: 'instructor email',
    example: 'ali@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  email?: string;

  @ApiProperty({ example: '30' })
  @ApiProperty({
    description: 'instructor percentage',
    example: '30',
  })
  @IsNumber()
  @IsNotEmpty()
  percentage?: number;
}