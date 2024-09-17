import DataBase from "../core/DataBase"
import { normalizeString } from "../utils"

class UserService {
    async get(username: string) {
        const users = await DataBase.read("users")

        const user = users.find((u) => u.username === normalizeString(username))
        return user
    }
}

export default new UserService()