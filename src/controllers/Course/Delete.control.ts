import { getCustomRepository } from 'typeorm'

import { Course } from '../../models'
import { CourseRepository } from '../../repositories'

interface Request {
    id: string
}

class DeleteCourseControl {
    public async execute({ id }: Request): Promise<Course> {
        const courseRepository = getCustomRepository(CourseRepository)
        const findCourse = await courseRepository.findOne({ where: { id } })

        if (!findCourse) {
            throw new Error('Curso não localizado!')
        }

        findCourse.enabled = false

        const course = await courseRepository.save(findCourse)
        return course
    }
}

export default DeleteCourseControl
