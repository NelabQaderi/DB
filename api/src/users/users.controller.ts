import { Controller, Get, Post, Body, Request, UseGuards, Inject } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { ReportDatesDto } from './dto/report.dto';

@ApiTags('Users')
@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Post('/signup')
  signUpUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.signUpUser(createUserDto);
  }

  @Post('/signin')
  signInUser(@Body() signInUserDto: SignInUserDto) {
    return this.usersService.signInUser(signInUserDto);
  }

  @Post("report")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getReport(@Body() reporrtDatesDto: ReportDatesDto) {
    return this.usersService.getReport(reporrtDatesDto);
  }
}
