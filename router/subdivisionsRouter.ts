import Router from 'express'

import SubdivisionsController from '../controllers/SubdivisionsController'

const router = Router()

router.get('/:id', SubdivisionsController.get)
router.get('', SubdivisionsController.getAll)
router.post('', SubdivisionsController.create)
router.put('', SubdivisionsController.update)
router.delete('/:id', SubdivisionsController.delete)

export default router
