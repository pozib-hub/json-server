import Router from 'express'
import CommentsController from '../controllers/CommentsController'

const router = Router()

router.get('/', CommentsController.get)
router.post('/', CommentsController.create)

export default router
