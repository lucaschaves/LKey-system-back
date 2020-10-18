import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm'

import { Course } from './Course.entity'

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ nullable: true })
  description: string

  @ManyToOne(() => Course, (course: Course) => course.id, {
    eager: true,
    nullable: false,
  })
  course: Course

  @Column({ default: true })
  enabled: boolean

  @CreateDateColumn({ name: 'created_At' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_At' })
  updatedAt: Date
}
