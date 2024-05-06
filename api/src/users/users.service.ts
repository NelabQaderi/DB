import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { In, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ReportDatesDto } from './dto/report.dto';
import { Installments } from 'src/installments/entities/installment.entity';
import { Students } from 'src/students/entities/student.entity';
import { Classes } from 'src/classes/entities/class.entity';
import { Instructors } from 'src/instructors/entities/instructor.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(Students)
    private readonly studentsRepository: Repository<Students>,
    @InjectRepository(Installments)
    private readonly installmentsRepository: Repository<Installments>,
    @InjectRepository(Classes)
    private readonly classesRepository: Repository<Classes>,
    @InjectRepository(Instructors)
    private readonly instructorsRepository: Repository<Instructors>,
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
      .andWhere('ins.installment_received = true')
      .getMany()

    let remained_installments_amount = 0
    let received_installments_amount = 0

    for (let installment of remained_installments) {
      remained_installments_amount += installment.installment_amount
    }

    for (let installment of received_installments) {
      received_installments_amount += installment.installment_amount
    }

    const classes_id = remained_installments.map((item: any) => (item.class_id))
    const students_id = remained_installments.map((item: any) => (item.student_id))

    const classes_data = await this.classesRepository.findBy({
      id: In(classes_id),
    });

    const students_data = await this.studentsRepository.findBy({
      id: In(students_id),
    });

    const instructors_id = classes_data.map((item: any) => (item.instructor_id))

    const instructors_data = await this.instructorsRepository.findBy({
      id: In(instructors_id)
    })

    const r = remained_installments.map((item: any) => {
      const class_data:any = classes_data.map((class_item: any) => (
          item.class_id === class_item.id ? {
            class_name: class_item.class_name, 
            instructor_id: class_item.instructor_id,
            start_date: class_item.start_date,
            start_time: class_item.start_time,
            class_fee: class_item.class_fee,
            class_fee_currency: class_item.class_fee_currency,
          } : null
      )).find(item => {
          return item !== null
      })

      const student_data:any = students_data.map((student_item: any) => (
          item.student_id === student_item.id ? {
            student_id: student_item.id,
            student_name: student_item.student_name, 
            student_fathername: student_item.student_fathername,
            student_phone_number: student_item.student_phone_number,
          } : null
      )).find(item => {
          return item !== null
      })

      return {
        installment_id: item.id,
        installment_date: item.installment_date,
        installment_type: item.installment_type,
        installment_received: item.installment_received,
        installment_amount: item.installment_amount,
        instructor_id: item.instructor_id,
        class_name: class_data?.class_name,
        start_date: class_data?.start_date,
        start_time: class_data?.start_time,
        class_fee: class_data?.class_fee,
        class_fee_currency: class_data?.class_fee_currency,
        student_id: student_data?.student_id,
        student_name: student_data?.student_name, 
        student_fathername: student_data?.student_fathername,
          student_phone_number: student_data?.student_phone_number,
        instructor_name: instructors_data.map((instructor_item: any) => (
          class_data.instructor_id === instructor_item.id ? instructor_item.name : null
      )).find(item => {
          return item !== null
      })
      }
    })

    return {
      students: students.length,
      remained_installments: remained_installments.length,
      received_installments: received_installments.length,
      remained_installments_amount,
      received_installments_amount,
      remained_installments_list: r,
    }
  }
}
