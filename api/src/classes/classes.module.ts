import { Module } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { Classes } from './entities/class.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { JwtAuthModule } from 'src/jwt/jwt.module';
import { JwtStrategy } from 'src/jwt/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Classes]), 
    JwtAuthModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'your-secret-key', // Replace with your own secret key
    }),
  ],
  controllers: [ClassesController],
  providers: [ClassesService, JwtStrategy,JwtAuthGuard],
  exports: [JwtAuthGuard]
})
export class ClassesModule {}
