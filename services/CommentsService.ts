import { v4 } from 'uuid'

import { IComment } from '../core/types'
import DataBase from '../core/DataBase'

class CommentsService {
    async get(articleId: string) {
        const allComments = await DataBase.read('comments')
        const users = await DataBase.read('users')

        const comments = allComments.filter((c) => c.articleId === articleId)

        const commentsWithUsers = comments.map((c) => {
            const user = users.find((u) => u.id === c.userId)
            return { ...c, user: user }
        })

        return commentsWithUsers
    }

    async create(comment: Omit<IComment, 'id'>) {
        const comments = await DataBase.read('comments')

        const newId = v4()

        const newComment: IComment = {
            ...comment,
            id: newId,
        }

        await DataBase.write('comments', [...comments, newComment])
    }
}

export default new CommentsService()
