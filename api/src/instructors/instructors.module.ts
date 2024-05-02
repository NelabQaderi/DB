import { Module } from '@nestjs/common';
import { InstructorsService } from './instructors.service';
import { InstructorsController } from './instructors.controller';
import { Instructors } from './entities/instructor.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { JwtAuthModule } from 'src/jwt/jwt.module';
import { JwtStrategy } from 'src/jwt/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Instructors]), 
    JwtAuthModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'your-secret-key', // Replace with your own secret key
    }),
  ],
  controllers: [InstructorsController],
  providers: [InstructorsService, JwtStrategy,JwtAuthGuard],
  exports: [JwtAuthGuard]
})
export class InstructorsModule {}
