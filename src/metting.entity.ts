import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm'
import { Employee } from './employee.entity'

@Entity()
export class Meeting {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  zoomUrl: string

  @ManyToMany(() => Employee, (employee) => employee.meetings)
  attendees: Employee[]
}
