import { getRepository } from 'typeorm'
import { Router, Request, Response } from 'express'

import { User } from '../entity/User.entity'

const UserRouter = Router()

UserRouter.get('/', async (req: Request, res: Response) => {
  try {
    const users = await getRepository(User).find()
    return res.status(200).json(users)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
})

UserRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const userOne = await getRepository(User).findOne(req.params.id)
    if (userOne) return res.status(200).json(userOne)
    return res.status(404).json({ message: 'User not found!' })
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
})

UserRouter.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const user = await getRepository(User).update(id, req.body)
  if (user.affected === 1) {
    const userOne = await getRepository(User).findOne(req.params.id)
    return res.status(200).json(userOne)
  }
  return res.status(404).json({ message: 'User not found!' })
})

UserRouter.post('/', async (req: Request, res: Response) => {
  try {
    const user = await getRepository(User).save(req.body)
    return res.status(201).json(user)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
})

UserRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const user = await getRepository(User).delete(req.params.id)
    return res.status(200).json(user)
  } catch (e) {
    return res.status(404).json({ message: 'User not found!' })
  }
})

export default UserRouter
