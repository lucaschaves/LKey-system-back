import { Router } from 'express'

import userRouter from './user.route'
import groupRouter from './group.route'
import courseRouter from './course.route'
import sessionRouter from './session.route'
import lessonRouter from './lesson.route'

const routes = Router()

routes.use('/user', userRouter)
routes.use('/group', groupRouter)
routes.use('/course', courseRouter)
routes.use('/session', sessionRouter)
routes.use('/lesson', lessonRouter)

export default routes
