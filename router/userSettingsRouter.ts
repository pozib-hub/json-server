import Router from 'express'

import UserSettingsController from '../controllers/UserSettingsController'

const router = Router()

router.get('/', UserSettingsController.get)
router.patch('/:key', UserSettingsController.update)
router.delete('/:key', UserSettingsController.delete)
router.post('/:key', UserSettingsController.create)

export default router
