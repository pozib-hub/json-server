import Router from 'express'
import parseUserDataBody from '../middlewares/parseUserDataBody'
import checkAuthorization from '../middlewares/checkAuthorization'
import { loggerRequest } from '../middlewares/loggerRequest'

import authRouter from './authRouter'
import profileRouter from './profileRouter'
import articlesRouter from './articlesRouter'
import commentsRouter from './commentsRouter'
import notificationsRouter from './notificationsRouter'
import ratingRouter from './ratingRouter'
import userSettingsRouter from './userSettingsRouter'
import userRouter from './userRouter'
import subdivisionsRouter from './subdivisionsRouter'

const router = Router()
router.use(loggerRequest)
router.use('/', authRouter)
router.use('/users', parseUserDataBody, checkAuthorization, userRouter)
router.use('/profile', profileRouter)
router.use('/articles', articlesRouter)
router.use('/comments', commentsRouter)
router.use('/notifications', parseUserDataBody, checkAuthorization, notificationsRouter)
router.use('/rating', parseUserDataBody, checkAuthorization, ratingRouter)
router.use('/userSettings', parseUserDataBody, checkAuthorization, userSettingsRouter)
router.use('/subdivisions', parseUserDataBody, checkAuthorization, subdivisionsRouter)

export default router
