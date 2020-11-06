import { Router } from 'express'
import { getCustomRepository } from 'typeorm'

import CreateLessonControl from '../controllers/Lesson/Create.control'
import { LessonRepository } from '../repositories'

const lessonRouter = Router()

lessonRouter.get('/', async (req, res) => {
    try {
        const lessonRepository = getCustomRepository(LessonRepository)
        const lessons = await lessonRepository.find()
        return res.json(lessons)
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
})

lessonRouter.post('/', async (req, res) => {
    try {
        const { name, description, url, duration, session, enabled } = req.body
        const createLesson = new CreateLessonControl()

        const lesson = await createLesson.execute({
            name,
            description,
            url,
            duration,
            session,
            enabled,
        })

        return res.json(lesson)
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
})

export default lessonRouter
