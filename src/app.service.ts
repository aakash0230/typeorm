import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Employee } from './employee.entity'
import { ContactInfo } from './contact-info.entity'
import { Task } from './task.entity'
import { Meeting } from './metting.entity'

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Employee) private emplyeeRepo: Repository<Employee>,
    @InjectRepository(ContactInfo)
    private contactInfoRepo: Repository<ContactInfo>,
    @InjectRepository(Task) private taskRepo: Repository<Task>,
    @InjectRepository(Meeting) private meetingRepo: Repository<Meeting>
  ) {}

  async seed() {
    // Creating a record in the employee table
    const ceo = this.emplyeeRepo.create({ name: 'Mr. CEO' })
    await this.emplyeeRepo.save(ceo)

    // --------------------------------------------------------------------------------------------

    // here we are creating a record in the contact info table of the above ceo
    // There are 2 ways :
    // 1st way -->
    const ceoContactInfo = this.contactInfoRepo.create({
      email: 'email@email.com',
    })
    ceoContactInfo.employee = ceo
    await this.contactInfoRepo.save(ceoContactInfo)

    // 2nd way -->
    /*const ceoContactInfo = this.contactInfoRepo.create({
      email : "email@email.com",
      employeeId : ceo.id
    });*/

    // -----------------------------------------------------------------------------------------------------------------

    // Creating a record in the employee table whose manager is mr.ceo
    const manager = this.emplyeeRepo.create({
      name: 'Aakash',
      manager: ceo,
    })
    
    const task1 = this.taskRepo.create({name : "Hire people"})
    await this.taskRepo.save(task1)
    const task2 = this.taskRepo.create({name : "Present to CEO"})
    await this.taskRepo.save(task2)
    
    manager.tasks = [task1, task2]
    
    const meeting1 = this.meetingRepo.create({zoomUrl : "Meeting.com"});
    meeting1.attendees = [ceo];
    await this.meetingRepo.save(meeting1);
    
    manager.meetings = [meeting1];
    
    await this.emplyeeRepo.save(manager)
  }

  async getEmployeeById(id : number){
    
    // fetching the data of the employee  1st way
    // return await this.emplyeeRepo.find({ where : {id}, 
    //   relations : ['manager', 'directReports', 'tasks', 'contactInfo', 'meetings']
    // })

    // fetching the data of the employee 2nd way
    return this.emplyeeRepo
      .createQueryBuilder('employee')
      .leftJoinAndSelect('employee.directReports', 'directReports')
      .leftJoinAndSelect('employee.meetings', 'meetings')
      .leftJoinAndSelect('employee.tasks', 'tasks')
      .where('employee.id = :employeeId', {employeeId : id})
      .getOne();
  }

  getHello(): string {
    return 'Hello World!'
  }
}
