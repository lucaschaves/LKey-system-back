import { getCustomRepository } from 'typeorm'

import { Course } from '../../models'
import { CourseRepository } from '../../repositories'

interface Request {
    name: string
    description: string
    enabled: boolean
}

class CreateCourseControl {
    public async execute({
        name,
        description,
        enabled,
    }: Request): Promise<Course> {
        const courseRepository = getCustomRepository(CourseRepository)
        const findCourse = await courseRepository.findOne({ where: { name } })

        if (findCourse) {
            throw new Error('Curso já registrado!')
        }

        const course = courseRepository.create({
            name,
            description,
            enabled,
        })

        await courseRepository.save(course)
        return course
    }
}

export default CreateCourseControl
