import { NextFunction, Request, Response } from "express"
import ArticlesService from "../services/ArticlesService"
import ApiError from "../exceptions/ApiError"
import { ArticleType } from "../core/types"

type ArticleFilters = {
    type: ArticleType[]
}


class ArticlesController {
    async get(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { id } = req.params

            if (!id) {
                throw ApiError.BadRequest('Вы не указали id статьи')
            }

            const article = await ArticlesService.get(id)

            if (!article) {
                throw ApiError.BadRequest('Мы не нашли эту статью :(')
            }

            return res.json(article)
        } catch (error) {
            console.log(error)
            const err = error as any //strick
            return res.status(500).json({ message: err.message })
        }
    }

    async getAll(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        const { order, page = 1, limit = 15, search } = req.query
        const filters = req.query.filters as ArticleFilters | undefined

        try {

            const articles = await ArticlesService
                .getAll({
                    page: Number(page),
                    limit: Number(limit),
                    search: search ? String(search) : undefined,
                    order: String(order) as "asc" | "desc",
                    filters,
                })

            return res.json(articles)

        } catch (error) {
            console.log(error)
            const err = error as any //strick
            return res.status(500).json({ message: err.message })
        }
    }
}

export default new ArticlesController()
