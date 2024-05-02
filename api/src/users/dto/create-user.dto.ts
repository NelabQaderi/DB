import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'admin' })
  @ApiProperty({
    description:
      'this is the place where a user enter their username',
    example: 'admin',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'Password@123321' })
  @ApiProperty({
    description: 'this is the place where user enter their password',
    example: 'friend',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'Admin' })
  @ApiProperty({
    description: 'this is the place where we define the access level of users (optional)',
    example: 'Admin',
  })
  @IsString()
  accessType?: string;
}

