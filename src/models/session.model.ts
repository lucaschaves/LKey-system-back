import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
} from 'typeorm'
import Course from './course.model'

@Entity('session')
class Session {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ nullable: false })
    name: string

    @Column()
    description: string

    @OneToOne(() => Course, course => course.id, {
        nullable: false,
        eager: true,
    })
    @JoinColumn()
    course: Course

    @Column({ type: 'boolean', default: true })
    enabled: boolean

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date
}

export default Session
