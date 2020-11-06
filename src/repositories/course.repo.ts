import { EntityRepository, Repository } from 'typeorm'
import { Course } from '../models'

@EntityRepository(Course)
class CourseRepository extends Repository<Course> {}

export default CourseRepository
