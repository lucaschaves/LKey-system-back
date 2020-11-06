import { EntityRepository, Repository } from 'typeorm'
import { Group } from '../models'

@EntityRepository(Group)
class GroupRepository extends Repository<Group> {}

export default GroupRepository
