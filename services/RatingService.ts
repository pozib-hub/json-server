import { IProfile } from "../core/types"
import DataBase from "../core/DataBase"

class RatingService {
    async getArticle(articleId: string, userId: string) {
        const rating = await DataBase.read("rating_articles")

        return rating.filter(r => r.articleId === articleId && r.userId === userId)
    }

    async updateArticle(id: string, profile: IProfile) {

    }
}

export default new RatingService()