import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put, UploadedFile, UseInterceptors, ForbiddenException, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Students } from './entities/student.entity';

@ApiTags('Students')
@Controller({ path: 'students', version: '1' })
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('student_photo'))
  @ApiBody({
    description: 'Create a new student',
    type: CreateStudentDto,
    schema: {
      type: 'object',
      properties: {
        student_photo: { type: 'string', format: 'binary', description: 'Student photo' },
      },
    },
  })
  @Post()
  create(@Body() createStudentDto: CreateStudentDto, @UploadedFile() student_photo: Express.Multer.File) {
    return this.studentsService.addStudent(student_photo.path, createStudentDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.studentsService.getAllStudents();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.getOneStudent(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.updateStudent(id, updateStudentDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.removeStudent(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('search/student')
  searchStudent(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('student_name') student_name: string ,
    @Query('student_fathername') student_fathername: string
  ) {
    return this.studentsService.searchStudent(
      page,
      limit,
      student_name,
      student_fathername
    )
  }
}
