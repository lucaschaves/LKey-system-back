import { Router } from 'express'
import { getCustomRepository } from 'typeorm'

import {
    CreateCourseControl,
    UpdateCourseControl,
    DeleteCourseControl,
} from '../controllers/Course'
import { CourseRepository } from '../repositories'

const courseRouter = Router()

courseRouter.get('/', async (req, res) => {
    try {
        const courseRepository = getCustomRepository(CourseRepository)
        const courses = await courseRepository.find()
        return res.json(courses)
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
})

courseRouter.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const courseRepository = getCustomRepository(CourseRepository)
        const courses = await courseRepository.findOne({ where: { id } })
        return res.json(courses)
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
})

courseRouter.post('/', async (req, res) => {
    try {
        const { name, description, enabled } = req.body
        const createCourse = new CreateCourseControl()

        const course = await createCourse.execute({
            name,
            description,
            enabled,
        })

        return res.json(course)
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
})

courseRouter.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { name, description, enabled } = req.body
        const updateCourse = new UpdateCourseControl()

        const course = await updateCourse.execute({
            id,
            name,
            description,
            enabled,
        })

        return res.json(course)
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
})

courseRouter.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deleteCourse = new DeleteCourseControl()

        const course = await deleteCourse.execute({
            id,
        })

        return res.json(course)
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
})

export default courseRouter
