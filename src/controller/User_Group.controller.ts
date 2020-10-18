import { getRepository } from 'typeorm'
import { Router, Request, Response } from 'express'

import { User_Group } from '../entity/User_Group.entity'

const User_GroupRouter = Router()

User_GroupRouter.get('/', async (req: Request, res: Response) => {
  try {
    const userGroups = await getRepository(User_Group).find()
    return res.status(200).json(userGroups)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
})

User_GroupRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const userGroupOne = await getRepository(User_Group).findOne(req.params.id)
    if (userGroupOne) return res.status(200).json(userGroupOne)
    return res.status(404).json({ message: 'User_Group not found!' })
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
})

User_GroupRouter.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const userGroup = await getRepository(User_Group).update(id, req.body)
  if (userGroup.affected === 1) {
    const userGroupOne = await getRepository(User_Group).findOne(req.params.id)
    return res.status(200).json(userGroupOne)
  }
  return res.status(404).json({ message: 'User_Group not found!' })
})

User_GroupRouter.post('/', async (req: Request, res: Response) => {
  try {
    const course = getRepository(User_Group)
    const userGroup = await course.save(req.body)
    return res.status(201).json(userGroup)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
})

User_GroupRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const userGroup = await getRepository(User_Group).delete(req.params.id)
    return res.status(200).json(userGroup)
  } catch (e) {
    return res.status(404).json({ message: 'User_Group not found!' })
  }
})

export default User_GroupRouter
