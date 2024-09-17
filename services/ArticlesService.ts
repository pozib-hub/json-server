import DataBase from "../core/DataBase"
import { normalizeString } from "../utils"
import { ArticleType } from "../core/types"

type ArticleFilters = {
    type: ArticleType[]
}

type Query = {
    page: number
    limit: number
    order: "asc" | "desc"
    search?: string
    filters?: ArticleFilters
}

class ArticlesService {
    async get(id?: string) {
        const articles = await DataBase.read("articles")
        const users = await DataBase.read("users")

        const article = articles.find(a => a.id === id)

        if (!article) return null

        return {
            ...article,
            user: users.find(u => u.id === article?.userId) || null
        }
    }

    async getAll(query: Query) {
        const {
            page = 1,
            limit = 15,
            order = "desc",
            search = "",
            filters
        } = query

        let articles = await DataBase.read("articles")

        articles = articles.filter(article => {
            const checkFilters: boolean[] = []

            if (filters?.type.length) {
                const isIntersectionTypes = article.type.some(
                    artType => filters?.type.find(
                        filterType => filterType.toLowerCase() === artType.toLowerCase()
                    )
                )

                checkFilters.push(isIntersectionTypes)
            }

            if (search) {
                const searchTitle = article.title.toLowerCase()
                    .includes(normalizeString(search))
                const searchSubtitle = article.subtitle.toLowerCase()
                    .includes(normalizeString(search))

                checkFilters.push((searchTitle || searchSubtitle))
            }

            return checkFilters.every(f => f)
        })

        articles = articles.slice(limit * (page - 1), limit * (page - 1) + limit)

        if (order === "desc") {
            articles = articles.reverse()
        }

        const users = await DataBase.read("users")

        const articlesWithUsers = articles.map(c => {
            const user = users.find(u => u.id === c.userId)
            return { ...c, user: user || null }
        })

        return articlesWithUsers
    }
}

export default new ArticlesService()