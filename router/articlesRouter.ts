import Router from 'express'
import ArticlesController from '../controllers/ArticlesController'

const router = Router()

router.get('/:id', ArticlesController.get)
router.get('/', ArticlesController.getAll)

export default router
