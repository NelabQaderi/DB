import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ReportDatesDto } from './dto/report.dto';
import { Installments } from 'src/installments/entities/installment.entity';
import { Students } from 'src/students/entities/student.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(Students)
    private readonly studentsRepository: Repository<Students>,
    @InjectRepository(Installments)
    private readonly installmentsRepository: Repository<Installments>,
    private readonly jwtService: JwtService
  ) {}

  async signUpUser(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const payload = {
      username: createUserDto.username,
      password: hashedPassword,
      accessType: createUserDto.accessType,
    }

    const user = await this.userRepository.save(payload);

    return {
      message: "Successfully create a new user.",
      username: user.username,
      accessType: user.accessType,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt
    };
  }

  async signInUser(signInUserDto: SignInUserDto) {

    const user = await this.userRepository.findOneBy({
      username: signInUserDto.username
    })

    if (!user || !(await bcrypt.compare(signInUserDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.username, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload)
    };
  }

  async getReport(reporrtDatesDto: ReportDatesDto) {
    const students = await this.studentsRepository.createQueryBuilder('stu')
      .andWhere("stu.student_registeration_date BETWEEN :start_date AND :end_date", 
        {start_date: reporrtDatesDto.start_date, end_date: reporrtDatesDto.end_date})
      .getMany()

    const remained_installments = await this.installmentsRepository.createQueryBuilder('ins')
      .andWhere("ins.installment_date BETWEEN :start_date AND :end_date", 
        {start_date: reporrtDatesDto.start_date, end_date: reporrtDatesDto.end_date})
      .andWhere('ins.installment_received = false')
      .getMany()

    const received_installments = await this.installmentsRepository.createQueryBuilder('ins')
      .andWhere("ins.installment_date BETWEEN :start_date AND :end_date", 
        {start_date: reporrtDatesDto.start_date, end_date: reporrtDatesDto.end_date})
      .andWhere('ins.installment_received = false')
      .getMany()

    let remained_installments_amount = 0
    let received_installments_amount = 0

    for (let installment of remained_installments) {
      remained_installments_amount += installment.installment_amount
    }

    for (let installment of received_installments) {
      received_installments_amount += installment.installment_amount
    }

    return {
      students: students.length,
      remained_installments: remained_installments.length,
      received_installments: received_installments.length,
      remained_installments_amount,
      received_installments_amount,
    }
  }
}
