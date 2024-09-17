import Router from 'express'
import checkAuthorization from '../middlewares/checkAuthorization'
import ProfileController from '../controllers/ProfileController'

const router = Router()

router.get('/', checkAuthorization, ProfileController.get)
router.put('/:id', checkAuthorization, ProfileController.update)

export default router
