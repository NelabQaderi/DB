import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class UpdateInstallmentDto {
  @ApiProperty({ example: 'advance' })
  @ApiProperty({
    description: 'installment type',
    example: 'advance',
  })
  @IsString()
  @IsNotEmpty()
  installment_type?: string;

  @ApiProperty({ example: '100' })
  @ApiProperty({
    description: 'installment amount',
    example: '100',
  })
  @IsNumber()
  @IsNotEmpty()
  installment_amount?: number;

  @ApiProperty({ example: '2024-05-01' })
  @ApiProperty({
    description: 'class start date',
    example: '2024-05-01',
  })
  @IsString()
  @IsNotEmpty()
  installment_date?: Date;

  @ApiProperty({ example: 'false' })
  @ApiProperty({
    description: 'installment received',
    example: 'false',
  })
  @IsBoolean()
  @IsNotEmpty()
  installment_received?: boolean;
}
