import Router from 'express'
import parseUserDataBody from '../middlewares/parseUserDataBody'
import checkAuthorization from '../middlewares/checkAuthorization'

import authRouter from './authRouter'
import profileRouter from './profileRouter'
import articlesRouter from './articlesRouter'
import commentsRouter from './commentsRouter'
import notificationsRouter from './notificationsRouter'
import ratingRouter from './ratingRouter'
import userSettingsRouter from "./userSettingsRouter"

const router = Router()

router.use('/', authRouter)
router.use('/profile', profileRouter)
router.use('/articles', articlesRouter)
router.use('/comments', commentsRouter)
router.use('/notifications', parseUserDataBody, checkAuthorization, notificationsRouter)
router.use('/rating', parseUserDataBody, checkAuthorization, ratingRouter)
router.use('/userSettings', parseUserDataBody, checkAuthorization, userSettingsRouter)


export default router
