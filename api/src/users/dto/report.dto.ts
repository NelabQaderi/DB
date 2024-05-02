import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString} from 'class-validator';

export class ReportDatesDto {
  @ApiProperty({ example: '2024-5-1' })
  @ApiProperty({
    description:
      'report start date',
    example: '2024-5-1',
  })
  @IsString()
  @IsNotEmpty()
  start_date: string;

  @ApiProperty({ example: '2024-6-1' })
  @ApiProperty({
    description: 'report end date',
    example: '2024-6-1',
  })
  @IsString()
  @IsNotEmpty()
  end_date: string;
}
