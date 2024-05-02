import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class UpdateClassDto {
  @ApiProperty({ example: 'Python' })
  @ApiProperty({
    description:
      'class name',
    example: 'Python',
  })
  @IsString()
  @IsNotEmpty()
  class_name?: string;

  @ApiProperty({ example: '879a623b-a0d7-4431-8766-683a099b6435' })
  @ApiProperty({
    description: 'class instructor id',
    example: '879a623b-a0d7-4431-8766-683a099b6435',
  })
  @IsString()
  @IsNotEmpty()
  instructor_id?: string;

  @ApiProperty({ example: '3' })
  @ApiProperty({
    description: 'class duration',
    example: '3',
  })
  @IsNumber()
  @IsNotEmpty()
  class_duration?: number;

  @ApiProperty({ example: '2024-05-01' })
  @ApiProperty({
    description: 'class start date',
    example: '2024-05-01',
  })
  @IsString()
  @IsNotEmpty()
  start_date?: Date;

  @ApiProperty({ example: '10:00 AM' })
  @ApiProperty({
    description: 'class start time',
    example: '10:00 AM',
  })
  @IsString()
  @IsNotEmpty()
  start_time?: string;

  @ApiProperty({ example: '100' })
  @ApiProperty({
    description: 'class fee',
    example: '100',
  })
  @IsNumber()
  @IsNotEmpty()
  class_fee?: number;

  @ApiProperty({ example: '$' })
  @ApiProperty({
    description: 'class fee currency',
    example: '$',
  })
  @IsString()
  @IsNotEmpty()
  class_fee_currency?: string;
}
