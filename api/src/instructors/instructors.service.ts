import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInstructorDto } from './dto/create-instructor.dto';
import { UpdateInstructorDto } from './dto/update-instructor.dto';
import { Instructors } from './entities/instructor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class InstructorsService {

  constructor(
    @InjectRepository(Instructors)
    private readonly instructorsRepository: Repository<Instructors>,
  ) {}

  async addInstructor(createInstructorDto: CreateInstructorDto) {
    const instructor = await this.instructorsRepository.save(createInstructorDto);

    return {
      message: 'Successfully create a new instructor.',
      ...instructor,
    }
  }

  async getAllInstructors() {
    const instructors = await this.instructorsRepository.find()
    return instructors;
  }

  async getOneInstructor(id: string) {
    const instructor = await this.instructorsRepository.findOneBy({
      id: id
    })
    if (!instructor) {
      throw new NotFoundException('No such instructor!!!')
    }
    return {
      message: 'Successfully find 1 instructor.',
      ...instructor,
    };
  }

  async updateInstructorData(id: string, updateInstructorDto: UpdateInstructorDto) {

    const instructor = await this.instructorsRepository.findOneBy({
      id: id
    })
    if (!instructor) {
      throw new NotFoundException('No such instructor!!!')
    }

    let updated_instructor = this.generateUpdateObject(instructor, updateInstructorDto)

    updated_instructor = await this.instructorsRepository.save(updated_instructor);

    return {
      message: 'Successfully update 1 instructor.',
      ...updated_instructor,
    };
  }

  async removeInstructor(id: string) {

    const instructor = await this.instructorsRepository.findOneBy({
      id: id
    })
    if (!instructor) {
      throw new NotFoundException('No such instructor!!!')
    }

    instructor.deletedAt = new Date();

    await this.instructorsRepository.save(instructor);

    return {
      message: 'Successfully delete 1 instructor.',
      ...instructor,
    };
  }


  // helper functions

  private generateUpdateObject(userData: any, updateInstructorDto: UpdateInstructorDto) {
    if (updateInstructorDto.name) {
      userData.name = updateInstructorDto.name;
    }
    if (updateInstructorDto.fathername) {
      userData.fathername = updateInstructorDto.fathername;
    }
    if (updateInstructorDto.phone_number) {
      userData.phone_number = updateInstructorDto.phone_number;
    }
    if (updateInstructorDto.email) {
      userData.email = updateInstructorDto.email;
    }
    if (updateInstructorDto.percentage) {
      userData.percentage = updateInstructorDto.percentage;
    }

    return userData;
  }
}
