import { INotification } from "../core/types"
import DataBase from "../core/DataBase"

class NotificationsService {
    async get(userId: string) {
        const notifications = await DataBase.read("notifications")

        return notifications.filter(c => c.userId === userId)
    }
}

export default new NotificationsService()