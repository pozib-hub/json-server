import Router from 'express'
import authRouter from './authRouter'
import profileRouter from './profileRouter'
import articlesRouter from './articlesRouter'
import commentsRouter from './commentsRouter'

const router = Router()

router.use('/', authRouter)
router.use('/profile', profileRouter)
router.use('/articles', articlesRouter)
router.use('/comments', commentsRouter)

export default router
