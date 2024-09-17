import { NextFunction, Request, Response } from "express"
import CommentsService from "../services/CommentsService"
import ApiError from "../exceptions/ApiError"
import { IComment } from "../core/types"


class CommentsController {

    async get(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { articleId, order } = req.query

            if (!articleId) {
                throw ApiError.BadRequest('ID не указан')
            }

            let comments = await CommentsService.get(articleId as string)

            if (order === "desc") {
                comments = comments.reverse()
            }

            return res.json(comments)
        } catch (error) {
            console.log(error)
            const err = error as any //strick
            return res.status(500).json({ message: err.message })
        }
    }

    async create(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        const { text, articleId, userId } = req.body

        try {
            const newComment = {
                text,
                articleId,
                userId
            }

            if (!articleId) {
                throw ApiError.BadRequest('ID не указан')
            }

            if (!text) {
                throw ApiError.BadRequest('text не указан')
            }

            await CommentsService.create(newComment)
            return res.status(200).json("ok")
        } catch (error) {
            console.log(error)
            const err = error as any //strick
            return res.status(500).json({ message: err.message })
        }
    }
}

export default new CommentsController()
