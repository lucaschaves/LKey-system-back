import { getRepository } from 'typeorm'
import { Router, Request, Response } from 'express'

import { Lesson } from '../entity/Lesson.entity'

const LessonRouter = Router()

LessonRouter.get('/', async (req: Request, res: Response) => {
  try {
    const lessons = await getRepository(Lesson).find()
    return res.status(200).json(lessons)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
})

LessonRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const lessonOne = await getRepository(Lesson).findOne(req.params.id)
    if (lessonOne) return res.status(200).json(lessonOne)
    return res.status(404).json({ message: 'Lesson not found!' })
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
})

LessonRouter.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const lesson = await getRepository(Lesson).update(id, req.body)
  if (lesson.affected === 1) {
    const lessonOne = await getRepository(Lesson).findOne(req.params.id)
    return res.status(200).json(lessonOne)
  }
  return res.status(404).json({ message: 'Lesson not found!' })
})

LessonRouter.post('/', async (req: Request, res: Response) => {
  try {
    const course = getRepository(Lesson)
    const lesson = await course.save(req.body)
    return res.status(201).json(lesson)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
})

LessonRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const lesson = await getRepository(Lesson).delete(req.params.id)
    return res.status(200).json(lesson)
  } catch (e) {
    return res.status(404).json({ message: 'Lesson not found!' })
  }
})

export default LessonRouter
