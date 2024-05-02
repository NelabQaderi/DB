import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, isNumber} from 'class-validator';

export class StudentAndClassDto {
  @ApiProperty({ example: '879a623b-a0d7-4431-8766-683a099b6435' })
  @ApiProperty({
    description: 'student id',
    example: '879a623b-a0d7-4431-8766-683a099b6435',
  })
  @IsString()
  @IsNotEmpty()
  student_id: string;

  @ApiProperty({ example: '879a623b-a0d7-4431-8766-683a099b6435' })
  @ApiProperty({
    description: 'class id',
    example: '879a623b-a0d7-4431-8766-683a099b6435',
  })
  @IsString()
  @IsNotEmpty()
  class_id: string;

  @ApiProperty({ example: '3' })
  @ApiProperty({
    description: 'number of installments',
    example: '3',
  })
  @IsNumber()
  @IsNotEmpty()
  number_of_installments: number;
}
