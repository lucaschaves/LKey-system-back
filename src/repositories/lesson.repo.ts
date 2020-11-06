import { EntityRepository, Repository } from 'typeorm'
import { Lesson } from '../models'

@EntityRepository(Lesson)
class LessonRepository extends Repository<Lesson> {}

export default LessonRepository
