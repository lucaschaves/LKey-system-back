import { Router } from 'express'
import UserRouter from '../controller/User.controller'
import LessonRouter from '../controller/Lesson.controller'
import CourseRouter from '../controller/Course.controller'
import SessionRouter from '../controller/Session.controller'
import GroupRouter from '../controller/Group.controller'
import User_GroupRouter from '../controller/User_Group.controller'

const routes = Router()

routes.use('/user', UserRouter)
routes.use('/lesson', LessonRouter)
routes.use('/course', CourseRouter)
routes.use('/session', SessionRouter)
routes.use('/usergroup', User_GroupRouter)
routes.use('/group', GroupRouter)

export default routes
