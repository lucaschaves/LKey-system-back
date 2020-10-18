import { getRepository } from 'typeorm'
import { Router, Request, Response } from 'express'

import { Course } from '../entity/Course.entity'

const CourseRouter = Router()

CourseRouter.get('/', async (req: Request, res: Response) => {
  try {
    const courses = await getRepository(Course).find()
    return res.status(200).json(courses)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
})

CourseRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const courseOne = await getRepository(Course).findOne(req.params.id)
    if (courseOne) return res.status(200).json(courseOne)
    return res.status(404).json({ message: 'Course not found!' })
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
})

CourseRouter.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const course = await getRepository(Course).update(id, req.body)
  if (course.affected === 1) {
    const courseOne = await getRepository(Course).findOne(req.params.id)
    return res.status(200).json(courseOne)
  }
  return res.status(404).json({ message: 'Course not found!' })
})

CourseRouter.post('/', async (req: Request, res: Response) => {
  try {
    const course = await getRepository(Course).save(req.body)
    return res.status(201).json(course)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
})

CourseRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const course = await getRepository(Course).delete(req.params.id)
    return res.status(200).json(course)
  } catch (e) {
    return res.status(404).json({ message: 'Course not found!' })
  }
})

export default CourseRouter
