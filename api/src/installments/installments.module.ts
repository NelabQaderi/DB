import { Module } from '@nestjs/common';
import { InstallmentsService } from './installments.service';
import { InstallmentsController } from './installments.controller';
import { Installments } from './entities/installment.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { JwtAuthModule } from 'src/jwt/jwt.module';
import { JwtStrategy } from 'src/jwt/jwt.strategy';
import { Classes } from 'src/classes/entities/class.entity';
import { Students } from 'src/students/entities/student.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Installments, Classes, Students]), 
    JwtAuthModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'your-secret-key', // Replace with your own secret key
    }),
  ],
  controllers: [InstallmentsController],
  providers: [InstallmentsService, JwtStrategy,JwtAuthGuard],
  exports: [JwtAuthGuard]
})
export class InstallmentsModule {}
 