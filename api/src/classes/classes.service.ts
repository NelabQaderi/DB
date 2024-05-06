import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Classes } from './entities/class.entity';

@Injectable()
export class ClassesService {

  constructor(
    @InjectRepository(Classes)
    private readonly classesRepository: Repository<Classes>,
  ) {}

  async addClass(createClassDto: CreateClassDto) {
    const newClass = await this.classesRepository.save(createClassDto);

    return {
      message: "Successfully create 1 new class.",
      ...newClass,
    }
  }

  async getAllClasses() {
    const allClasses = await this.classesRepository.find()
    return allClasses;
  }

  async getOneClass(id: string) {
    const one_class = await this.classesRepository.findOneBy({
      id: id
    })

    if (!one_class) {
      throw new NotFoundException("No such class!!!")
    }

    return {
      message: "Successfully get 1 class.",
      ...one_class,
    };
  }

  async updateClass(id: string, updateClassDto: UpdateClassDto) {
    const one_class = await this.classesRepository.findOneBy({
      id: id
    })

    if (!one_class) {
      throw new NotFoundException("No such class!!!")
    }

    let updated_class = this.generateUpdateObject(one_class, updateClassDto);

    updated_class = await this.classesRepository.save(updated_class);

    return {
      message: "Successfully update 1 class.",
      ...updated_class,
    }
  }

  async removeClass(id: string) {
    const one_class = await this.classesRepository.findOneBy({
      id: id
    })

    if (!one_class) {
      throw new NotFoundException("No such class!!!")
    }

    one_class.deletedAt = new Date();

    await this.classesRepository.save(one_class);

    return {
      message: "Successfully delete 1 class.",
      ...one_class,
    }
  }

  // helper functions

  private generateUpdateObject(classData: any, updateClassDto: UpdateClassDto) {
    if (updateClassDto.class_name) {
      classData.class_name = updateClassDto.class_name;
    }
    if (updateClassDto.instructor_id) {
      classData.instructor_id = updateClassDto.instructor_id;
    }
    if (updateClassDto.class_duration) {
      classData.class_duration = updateClassDto.class_duration;
    }
    if (updateClassDto.start_date) {
      classData.start_date = updateClassDto.start_date;
    }
    if (updateClassDto.start_time) {
      classData.start_time = updateClassDto.start_time;
    }
    if (updateClassDto.class_fee) {
      classData.class_fee = updateClassDto.class_fee;
    }

    if (updateClassDto.class_fee_currency) {
      classData.class_fee_currency = updateClassDto.class_fee_currency;
    }

    return classData;
  }
}
