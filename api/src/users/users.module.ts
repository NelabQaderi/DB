import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { JwtAuthModule } from 'src/jwt/jwt.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/jwt/jwt.strategy';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { Students } from 'src/students/entities/student.entity';
import { Installments } from 'src/installments/entities/installment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Students, Installments]), 
    JwtAuthModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'your-secret-key', // Replace with your own secret key
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy,JwtAuthGuard],
  exports: [JwtAuthGuard]
})
export class UsersModule {}
