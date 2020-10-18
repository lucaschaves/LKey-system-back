import { getRepository } from 'typeorm'
import { Router, Request, Response } from 'express'

import { Session } from '../entity/Session.entity'

const SessionRouter = Router()

SessionRouter.get('/', async (req: Request, res: Response) => {
  try {
    const sessions = await getRepository(Session).find()
    return res.status(200).json(sessions)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
})

SessionRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const sessionOne = await getRepository(Session).findOne(req.params.id)
    if (sessionOne) return res.status(200).json(sessionOne)
    return res.status(404).json({ message: 'Session not found!' })
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
})

SessionRouter.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const session = await getRepository(Session).update(id, req.body)
  if (session.affected === 1) {
    const sessionOne = await getRepository(Session).findOne(req.params.id)
    return res.status(200).json(sessionOne)
  }
  return res.status(404).json({ message: 'Session not found!' })
})

SessionRouter.post('/', async (req: Request, res: Response) => {
  try {
    const course = getRepository(Session)
    const session = await course.save(req.body)
    return res.status(201).json(session)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
})

SessionRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const session = await getRepository(Session).delete(req.params.id)
    return res.status(200).json(session)
  } catch (e) {
    return res.status(404).json({ message: 'Session not found!' })
  }
})

export default SessionRouter
