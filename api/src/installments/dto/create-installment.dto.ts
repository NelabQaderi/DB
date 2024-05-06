import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class CreateInstallmentDto {
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

  @ApiProperty({ example: 'advance' })
  @ApiProperty({
    description: 'installment type',
    example: 'advance',
  })
  @IsString()
  @IsNotEmpty()
  installment_type: string;

  @ApiProperty({ example: '100' })
  @ApiProperty({
    description: 'installment amount',
    example: '100',
  })
  @IsNumber()
  @IsNotEmpty()
  installment_amount: number;
}
