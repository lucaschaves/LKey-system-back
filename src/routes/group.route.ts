import { Router } from 'express'
import { getCustomRepository } from 'typeorm'

import CreateGroupControl from '../controllers/Group/Create.control'
import { GroupRepository } from '../repositories'

const groupRouter = Router()

groupRouter.get('/', async (req, res) => {
    try {
        const groupRepository = getCustomRepository(GroupRepository)
        const groups = await groupRepository.find()
        return res.json(groups)
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
})

groupRouter.post('/', async (req, res) => {
    try {
        const { name, description, enabled } = req.body
        const createGroup = new CreateGroupControl()

        const group = await createGroup.execute({
            name,
            description,
            enabled,
        })

        return res.json(group)
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
})

export default groupRouter
