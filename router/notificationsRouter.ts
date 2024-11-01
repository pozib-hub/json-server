import Router from 'express'
import NotificationsController from '../controllers/NotificationsController'

const router = Router()

router.get('/', NotificationsController.get)


export default router
