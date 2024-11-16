import DataBase from "../core/DataBase"


class UsersService {
    async getOne(userId: string) {
        const users = await DataBase.read("users")

        return users.find(u => u.id === userId)
    }

}

export default new UsersService()