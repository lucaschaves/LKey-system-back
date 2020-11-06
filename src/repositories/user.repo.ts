import { EntityRepository, Repository } from 'typeorm'
import { User } from '../models'

@EntityRepository(User)
class UserRepository extends Repository<User> {
    public async findByEmail(email: string): Promise<User | null> {
        const findUser = await this.findOne({
            where: { email },
        })

        return findUser || null
    }
}

export default UserRepository
