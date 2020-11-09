import { getCustomRepository } from 'typeorm'

import { Course } from '../../models'
import { CourseRepository } from '../../repositories'

interface Request {
    id?: string
    name?: string
    description?: string
    enabled?: boolean
}

class UpdateCourseControl {
    public async execute({
        id,
        name,
        description,
        enabled,
    }: Request): Promise<Course> {
        const courseRepository = getCustomRepository(CourseRepository)
        const findCourse = await courseRepository.findOne({ where: { id } })

        if (!findCourse) {
            throw new Error('Curso não localizado!')
        }

        if (name) findCourse.name = name
        if (description) findCourse.description = description
        if (enabled) findCourse.enabled = enabled

        const course = await courseRepository.save(findCourse)
        return course
    }
}

export default UpdateCourseControl
