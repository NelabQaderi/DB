import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';



@ApiTags('Classes')
@Controller({ path: 'classes', version: '1' })
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  addClass(@Body() createClassDto: CreateClassDto) {
    return this.classesService.addClass(createClassDto);
  }


  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  getAllClasses() {
    return this.classesService.getAllClasses();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  getOneClass(@Param('id') id: string) {
    return this.classesService.getOneClass(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put(':id')
  updateClass(@Param('id') id: string, @Body() updateClassDto: UpdateClassDto) {
    return this.classesService.updateClass(id, updateClassDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  removeClass(@Param('id') id: string) {
    return this.classesService.removeClass(id);
  }
}
