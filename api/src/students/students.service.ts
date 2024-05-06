import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Students } from './entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { existsSync, mkdirSync, } from 'fs';
import { Pagination, paginate } from 'nestjs-typeorm-paginate';
 
@Injectable()
export class StudentsService {

  constructor(
    @InjectRepository(Students)
    private readonly studentsRepository: Repository<Students>,
  ) {}

  async addStudent(student_photo: string, createStudentDto: CreateStudentDto) {

    const new_student = await this.studentsRepository.save({
      ...createStudentDto,
      student_photo,
    })

    return {
      message: "Successfully create 1 new student.",
      ...new_student,
    };
  }

  async getAllStudents() {
    const all_students = await this.studentsRepository.find();
    return all_students;
  }

  async getOneStudent(id: string) {

    const one_student = await this.studentsRepository.findOneBy({
      id: id
    });

    if (!one_student) {
      throw new NotFoundException("No such student!!!");
    }

    return {
      message: "Successfully get 1 student.",
      ...one_student,
    }
  }

  async updateStudent(id: string, updateStudentDto: UpdateStudentDto) {

    const one_student = await this.studentsRepository.findOneBy({
      id: id
    });

    if (!one_student) {
      throw new NotFoundException("No such student!!!");
    }

    let updated_student = this.generateUpdateObject(one_student, updateStudentDto);

    updateStudentDto = await this.studentsRepository.save(updated_student);

    return {
      message: "Successfully update 1 student.",
      ...updateStudentDto,
    };
  }

  async removeStudent(id: string) {

    let one_student = await this.studentsRepository.findOneBy({
      id: id
    });

    if (!one_student) {
      throw new NotFoundException("No such student!!!");
    }

    one_student.deletedAt = new Date()

    one_student = await this.studentsRepository.save(one_student);

    return {
      message: "Successfully delete 1 student.",
      ...one_student,
    };
  }

  async searchStudent(
    page: number, limit: number, student_name: 
    string, student_fathername: string): Promise<Pagination<Students>> {

      let queryBuilder = this.studentsRepository.createQueryBuilder('stu')
        .andWhere('stu.student_name LIKE :student_name',
          {student_name: `%${student_name}%`})
      if(student_fathername) {
        queryBuilder = queryBuilder.andWhere('stu.student_fathername LIKE :student_fathername',
          {student_fathername: `%${student_fathername}%`})
      }
        
      return paginate<Students>(queryBuilder, {page, limit})
  }

  // helper fuctions

  private generateUpdateObject(studentData: any, updateStudentDto: UpdateStudentDto) {
    if (updateStudentDto.student_name) {
      studentData.student_name = updateStudentDto.student_name;
    }
    if (updateStudentDto.student_fathername) {
      studentData.student_fathername = updateStudentDto.student_fathername;
    }
    if (updateStudentDto.student_phone_number) {
      studentData.student_phone_number = updateStudentDto.student_phone_number;
    }
    if (updateStudentDto.student_address) {
      studentData.student_address = updateStudentDto.student_address;
    }

    return studentData;
  }
}
