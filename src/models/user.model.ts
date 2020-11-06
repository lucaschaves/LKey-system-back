import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
} from 'typeorm'

import Group from './group.model'

@Entity('user')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ nullable: false })
    name: string

    @Column({ unique: true, nullable: false })
    email: string

    @Column({ nullable: false })
    password: string

    @Column({ type: 'timestamp' })
    date_birth: Date

    @OneToOne(() => Group, group => group.id, { nullable: false, eager: true })
    @JoinColumn()
    group: Group

    @Column({ type: 'boolean', default: true })
    enabled: boolean

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date
}

export default User
