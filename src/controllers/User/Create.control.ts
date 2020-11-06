import { getCustomRepository } from 'typeorm'
import { hash } from 'bcryptjs'

import { Group, User } from '../../models'
import { UserRepository } from '../../repositories'

interface Request {
    name: string
    email: string
    password: string
    date_birth: Date
    group: Group
    enabled: boolean
}

class CreateUserControl {
    public async execute({
        name,
        email,
        password,
        date_birth,
        group,
        enabled,
    }: Request): Promise<User> {
        const userRepository = getCustomRepository(UserRepository)
        const findEmailUser = await userRepository.findByEmail(email)

        if (findEmailUser) {
            throw new Error('E-mail already registered')
        }

        const hashedPassword = await hash(password, 10)

        const user = userRepository.create({
            name,
            email,
            password: hashedPassword,
            date_birth,
            enabled,
            group,
        })

        await userRepository.save(user)

        return user
    }
}

export default CreateUserControl
