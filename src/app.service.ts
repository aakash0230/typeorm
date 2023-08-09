import { Injectable, } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Employee } from './employee.entity';
import { ContactInfo } from './contact-info.entity';
import { Task } from './task.entity';
import { Meeting } from './metting.entity';


@Injectable()
export class AppService {

  constructor(
    @InjectRepository(Employee) private emplyeeRepo : Repository<Employee>,
    @InjectRepository(ContactInfo) private contactInfoRepo : Repository<ContactInfo>,
    @InjectRepository(Task) private taskRepo : Repository<Task>,
    @InjectRepository(Meeting) private meetingRepo : Repository<Meeting>

  ) {}

  async seed(){


    // Creating a record in the employee table
    const ceo = this.emplyeeRepo.create({name : 'Mr. CEO'});
    await this.emplyeeRepo.save(ceo);

// --------------------------------------------------------------------------------------------

    // here we are creating a record in the contact info table of the above ceo
    // There are 2 ways : 
    // 1st way -->
    const ceoContactInfo = this.contactInfoRepo.create({
      email : "email@email.com",
    });
    ceoContactInfo.employee = ceo;
    await this.contactInfoRepo.save(ceoContactInfo)

    // 2nd way -->
    /*const ceoContactInfo = this.contactInfoRepo.create({
      email : "email@email.com",
      employeeId : ceo.id
    });*/

// -----------------------------------------------------------------------------------------------------------------

    // Creating a record in the employee table whose manager is mr.ceo
    const manager = this.emplyeeRepo.create({
      name : "Aakash",
      manager : ceo,
    });

  }






  getHello(): string {
    return 'Hello World!';
  }
} 
