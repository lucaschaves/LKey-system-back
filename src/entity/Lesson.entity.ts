import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Session } from './Session.entity'

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  description?: string

  @Column()
  url: string

  @ManyToOne(() => Session, (session: Session) => session.id, {
    eager: true,
    nullable: false,
  })
  session: Session

  @Column({ default: true })
  enabled: boolean

  @CreateDateColumn({ name: 'created_At' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_At' })
  updatedAt: Date
}
