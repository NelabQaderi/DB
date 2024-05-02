import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString} from 'class-validator';

export class CreateStudentDto {
  @ApiProperty({ example: 'Ali' })
  @ApiProperty({
    description:
      'student name',
    example: 'Ali',
  })
  @IsString()
  @IsNotEmpty()
  student_name: string;

  @ApiProperty({ example: 'Ahmad' })
  @ApiProperty({
    description: 'student father name',
    example: 'Ahmad',
  })
  @IsString()
  @IsNotEmpty()
  student_fathername: string;

  @ApiProperty({ example: '0787311374' })
  @ApiProperty({
    description: 'student phone number',
    example: '0787311374',
  })
  @IsString()
  @IsNotEmpty()
  student_phone_number: string;

  @ApiProperty({ example: 'Kabul, Afg' })
  @ApiProperty({
    description: 'student address',
    example: 'Kabul, Afg',
  })
  @IsString()
  @IsNotEmpty()
  student_address: string;

  @ApiProperty({ type: 'string', format: 'binary', description: 'Student photo' })
  student_photo: string;
}
