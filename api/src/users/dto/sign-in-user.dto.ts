import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString} from 'class-validator';

export class SignInUserDto {
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
}
