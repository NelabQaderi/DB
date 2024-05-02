import { Controller, Get, Post, Body, Param, UseGuards, Put } from '@nestjs/common';
import { InstallmentsService } from './installments.service';
import { CreateInstallmentDto } from './dto/create-installment.dto';
import { UpdateInstallmentDto } from './dto/update-installment.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { StudentAndClassDto } from './dto/student-and-class.dto';


@ApiTags('Installments')
@Controller({ path: 'installments', version: '1' })
export class InstallmentsController {
  constructor(private readonly installmentsService: InstallmentsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  addInstallment(@Body() studentAndClassDto: StudentAndClassDto) {
    return this.installmentsService.addInstallment(studentAndClassDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  getAllInstallmetns() {
    return this.installmentsService.getAllInstallments();
  }
 
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  getOneINstallment(@Param('id') id: string) {
    return this.installmentsService.getOneINstallment(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put(':id')
  update(@Param('id') id: string, @Body() updateInstallmentDto: UpdateInstallmentDto) {
    return this.installmentsService.updateInstallment(id, updateInstallmentDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put('received/:id')
  installmentReceived(@Param('id') id: string) {
    return this.installmentsService.installmentReceived(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put('print/:id')
  getIntallmentForPrint(@Param('id') id: string) {
    return this.installmentsService.getIntallmentForPrint(id);
  }
}
