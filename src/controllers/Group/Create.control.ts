import { getCustomRepository } from 'typeorm'

import { Group } from '../../models'
import { GroupRepository } from '../../repositories'

interface Request {
    name: string
    description: string
    enabled: boolean
}

class CreateGroupControl {
    public async execute({
        name,
        description,
        enabled,
    }: Request): Promise<Group> {
        const groupRepository = getCustomRepository(GroupRepository)
        const findGroup = await groupRepository.findOne({ where: { name } })

        if (findGroup) {
            throw new Error('Group already registered')
        }

        const group = groupRepository.create({
            name,
            description,
            enabled,
        })

        await groupRepository.save(group)

        return group
    }
}

export default CreateGroupControl
