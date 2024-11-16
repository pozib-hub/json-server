import Router from 'express'
import UsersController from '../controllers/UsersController'

const router = Router()

router.get('/me', UsersController.getMe)
router.get('/:id', UsersController.get)

export default router
