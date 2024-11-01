import Router from 'express'

import RatingController from '../controllers/RatingController'

const router = Router()

router.get('/articles', RatingController.getArticles)
router.get('/profile', RatingController.getProfile)
// router.put('/:id', RatingController.update)

export default router
