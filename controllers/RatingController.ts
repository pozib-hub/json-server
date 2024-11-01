import { NextFunction, Request, Response } from "express"

import ApiError from "../exceptions/ApiError"
import RatingService from "../services/RatingService"
import { IComment } from "../core/types"

class RatingController {
    async getArticles(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { articleId } = req.query
            const { user } = req.body
            const userId = user.id

            if (!articleId) {
                throw ApiError.BadRequest('ID не указан')
            }

            let article = await RatingService.getArticle(articleId as string, userId)
            return res.json(article)
        } catch (error) {
            console.log(error)
            const err = error as any //strick
            return res.status(500).json({ message: err.message })
        }
    }

    async getProfile(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        const { } = req.body

        try {

        } catch (error) {
            console.log(error)
            const err = error as any //strick
            return res.status(500).json({ message: err.message })
        }
    }
}

export default new RatingController()
