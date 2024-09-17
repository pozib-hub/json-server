import { IUser } from "../core/types"


export default class UserDto {
    id: string
    username: string

    constructor(model: IUser) {
        this.id = model.id
        this.username = model.username
    }
}

