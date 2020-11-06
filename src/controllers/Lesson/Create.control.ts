import { getCustomRepository } from 'typeorm'

import { Lesson, Session } from '../../models'
import { LessonRepository } from '../../repositories'

interface Request {
    name: string
    description: string
    url: string
    session: Session
    duration: number
    enabled: boolean
}

class CreateLessonControl {
    public async execute({
        name,
        description,
        url,
        session,
        duration,
        enabled,
    }: Request): Promise<Lesson> {
        const lessonRepository = getCustomRepository(LessonRepository)
        const findLesson = await lessonRepository.findOne({ where: { name } })

        if (findLesson) {
            throw new Error('Lesson already registered')
        }

        const lesson = lessonRepository.create({
            name,
            description,
            url,
            session,
            duration,
            enabled,
        })

        await lessonRepository.save(lesson)

        return lesson
    }
}

export default CreateLessonControl
