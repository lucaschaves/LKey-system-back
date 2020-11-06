import { Router } from 'express'
import { getCustomRepository } from 'typeorm'

import CreateSessionControl from '../controllers/Session/Create.control'
import { SessionRepository } from '../repositories'

const sessionRouter = Router()

sessionRouter.get('/', async (req, res) => {
    try {
        const sessionRepository = getCustomRepository(SessionRepository)
        const sessions = await sessionRepository.find()
        return res.json(sessions)
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
})

sessionRouter.post('/', async (req, res) => {
    try {
        const { name, description, course, enabled } = req.body
        const createSession = new CreateSessionControl()

        const session = await createSession.execute({
            name,
            description,
            course,
            enabled,
        })

        return res.json(session)
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
})

export default sessionRouter
