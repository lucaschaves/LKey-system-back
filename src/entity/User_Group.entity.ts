import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm'
import { Group } from './Group.entity'
import { User } from './User.entity'

@Entity()
export class User_Group {
  @PrimaryGeneratedColumn()
  id: number

  @OneToOne(() => User, (user: User) => user.id, {
    eager: true,
    nullable: false,
  })
  user: User

  @OneToOne(() => Group, (group: Group) => group.id, {
    eager: true,
    nullable: false,
  })
  group: Group

  @CreateDateColumn({ name: 'created_At' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_At' })
  updatedAt: Date
}
