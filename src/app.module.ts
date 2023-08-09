import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { ContactInfo } from './contact-info.entity';
import { Task } from './task.entity';
import { Meeting } from './metting.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type : 'mysql',
    host : 'localhost',
    port : 3306,
    username : 'root',
    password : 'root',
    database : 'typeOrm',
    // entities : [Employee, ContactInfo, Task, Meeting],
    synchronize : true,
  }),
  TypeOrmModule.forFeature([
    Employee,
    ContactInfo,
    Task,
    Meeting,
  ]),
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
