import { getRepository } from 'typeorm'
import { Router, Request, Response } from 'express'

import { Group } from '../entity/Group.entity'

const GroupRouter = Router()

GroupRouter.get('/', async (req: Request, res: Response) => {
  try {
    const groups = await getRepository(Group).find()
    return res.status(200).json(groups)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
})

GroupRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const groupOne = await getRepository(Group).findOne(req.params.id)
    if (groupOne) return res.status(200).json(groupOne)
    return res.status(404).json({ message: 'Group not found!' })
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
})

GroupRouter.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const group = await getRepository(Group).update(id, req.body)
  if (group.affected === 1) {
    const groupOne = await getRepository(Group).findOne(req.params.id)
    return res.status(200).json(groupOne)
  }
  return res.status(404).json({ message: 'Group not found!' })
})

GroupRouter.post('/', async (req: Request, res: Response) => {
  try {
    const course = getRepository(Group)
    const group = await course.save(req.body)
    return res.status(201).json(group)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
})

GroupRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const group = await getRepository(Group).delete(req.params.id)
    return res.status(200).json(group)
  } catch (e) {
    return res.status(404).json({ message: 'Group not found!' })
  }
})

export default GroupRouter
