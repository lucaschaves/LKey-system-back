import { getCustomRepository } from 'typeorm'

import { Course, Session } from '../../models'
import { SessionRepository } from '../../repositories'

interface Request {
    name: string
    description: string
    course: Course
    enabled: boolean
}

class CreateSessionControl {
    public async execute({
        name,
        description,
        course,
        enabled,
    }: Request): Promise<Session> {
        const sessionRepository = getCustomRepository(SessionRepository)
        const findSession = await sessionRepository.findOne({ where: { name } })

        if (findSession) {
            throw new Error('Session already registered')
        }

        const session = sessionRepository.create({
            name,
            description,
            course,
            enabled,
        })

        await sessionRepository.save(session)

        return session
    }
}

export default CreateSessionControl
