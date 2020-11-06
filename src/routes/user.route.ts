import { Router } from 'express'
import { getCustomRepository } from 'typeorm'

import CreateUserControl from '../controllers/User/Create.control'
import { UserRepository } from '../repositories'

const userRouter = Router()

userRouter.get('/', async (req, res) => {
    try {
        const userRepository = getCustomRepository(UserRepository)
        const users = await userRepository.find()
        return res.json(users)
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
})

userRouter.post('/', async (req, res) => {
    try {
        const createUser = new CreateUserControl()
        const user = await createUser.execute(req.body)
        return res.json(user)
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
})

export default userRouter
