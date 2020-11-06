import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
} from 'typeorm'
import Session from './session.model'

@Entity('lesson')
class Lesson {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ nullable: false })
    name: string

    @Column()
    description: string

    @Column({ nullable: false })
    url: string

    @OneToOne(() => Session, session => session.id, {
        nullable: false,
        eager: true,
    })
    @JoinColumn()
    session: Session

    @Column({ type: 'integer' })
    duration: number

    @Column({ type: 'boolean', default: true })
    enabled: boolean

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date
}

export default Lesson
