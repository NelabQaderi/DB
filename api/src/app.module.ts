import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceForNest } from './database/nest-data-source';
import { UsersModule } from './users/users.module';
import { InstructorsModule } from './instructors/instructors.module';
import { ClassesModule } from './classes/classes.module';
import { StudentsModule } from './students/students.module';
import { InstallmentsModule } from './installments/installments.module';


@Module({
  imports: [ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(Object.assign(DataSourceForNest)),
    UsersModule,
    InstructorsModule,
    ClassesModule,
    StudentsModule,
    InstallmentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
