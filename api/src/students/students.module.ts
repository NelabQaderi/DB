import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { Students } from './entities/student.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { JwtAuthModule } from 'src/jwt/jwt.module';
import { JwtStrategy } from 'src/jwt/jwt.strategy';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptions } from 'src/classes/configs/upload.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Students]), 
    JwtAuthModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'your-secret-key', // Replace with your own secret key
    }),
    MulterModule.register(multerOptions)
  ],
  controllers: [StudentsController],
  providers: [StudentsService, JwtStrategy,JwtAuthGuard],
  exports: [JwtAuthGuard]
})
export class StudentsModule {} 
