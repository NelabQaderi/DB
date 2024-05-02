import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInstallmentDto } from './dto/create-installment.dto';
import { UpdateInstallmentDto } from './dto/update-installment.dto';
import { Installments } from './entities/installment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentAndClassDto } from './dto/student-and-class.dto';
import { Students } from 'src/students/entities/student.entity';
import { Classes } from 'src/classes/entities/class.entity';

@Injectable()
export class InstallmentsService {

  constructor(
    @InjectRepository(Installments)
    private readonly installmentsRepository: Repository<Installments>,
    @InjectRepository(Students)
    private readonly studentsRepository: Repository<Students>,
    @InjectRepository(Classes)
    private readonly classesRepository: Repository<Classes>,
  ) {}

  async addInstallment(studentAndClassDto: StudentAndClassDto) {
    const { student_id, class_id, number_of_installments } = studentAndClassDto;

    const student_data = await this.studentsRepository.findOneBy({
      id: student_id
    })

    const class_data = await this.classesRepository.findOneBy({
      id: class_id
    })

    if (!student_data) {
      throw new NotFoundException("No such student!!!");
    }

    if (!class_data) {
      throw new NotFoundException("No such class!!!");
    }

    const class_fee = class_data.class_fee;
    const class_fee_per_installments = class_fee / number_of_installments;

    for (let x=0; x<number_of_installments; x++) {
      const installment: CreateInstallmentDto = {
          class_id: class_id,
          student_id: student_id,
          installment_amount: class_fee_per_installments,
          installment_type: x === 0 ? "advance" : `installment ${x}`
        }
      
      await this.installmentsRepository.save(installment);
    }

    const student_installments = await this.installmentsRepository.find({
      where: {
        student_id: student_id,
        class_id: class_id,
      }
    })

    return {
      message: 'Students Installments',
      student_installments,
    }

  }

  async getAllInstallments() {
    const installments = await this.installmentsRepository.findBy({
      installment_received: false
    });
    return installments;
  }

  async getOneINstallment(id: string) {

    const installment = await this.installmentsRepository.findOneBy({
      id: id,
    });

    if (!installment) {
      throw new NotFoundException("No such installment!!!!")
    }

    return {
      message: "Successfully get 1 installments.",
      ...installment
    }
  }

  async updateInstallment(id: string, updateInstallmentDto: UpdateInstallmentDto) {

    const installment = await this.installmentsRepository.findOneBy({
      id: id,
    });

    if (!installment) {
      throw new NotFoundException("No such installment!!!!")
    }

    let updated_installment = this.generateUpdateObject(installment, updateInstallmentDto);

    updated_installment = await this.installmentsRepository.save(updated_installment);

    return {
      message: "Successfully update 1 installment.",
      ...updated_installment
    };
  }

  async installmentReceived(id: string) {

    let installment = await this.installmentsRepository.findOneBy({
      id: id,
    });

    if (!installment) {
      throw new NotFoundException("No such installment!!!!")
    }

    installment.installment_received = true;

    installment = await this.installmentsRepository.save(installment);

    return {
      message: 'One Installment Received Successfully',
      ...installment,
    };
  }

  async getIntallmentForPrint(id: string) {
    let installment = await this.installmentsRepository.findOneBy({
      id: id,
    });

    if (!installment) {
      throw new NotFoundException("No such installment!!!!")
    }

    const student_data = await this.studentsRepository.findOneBy({
      id: installment.student_id,
    });

    const class_data = await this.classesRepository.findOneBy({
      id: installment.class_id,
    });

    if (!student_data) {
      throw new NotFoundException('No such student!!!')
    }

    if (!class_data) {
      throw new NotFoundException('No such class!!!')
    }


    return {
      student_data,
      class_data,
      installment
    }

  }

  // helper functions

  private generateUpdateObject(installmentData: any, updateInstallmentDto: UpdateInstallmentDto) {
    if (updateInstallmentDto.installment_date) {
      installmentData.installment_date = updateInstallmentDto.installment_date;
    }
    if (updateInstallmentDto.installment_amount) {
      installmentData.installment_amount = updateInstallmentDto.installment_amount;
    }
    if (updateInstallmentDto.installment_type) {
      installmentData.installment_type = updateInstallmentDto.installment_type;
    }
    if (updateInstallmentDto.installment_received) {
      installmentData.start_date = updateInstallmentDto.installment_received;
    }
    return installmentData;
  }
}
