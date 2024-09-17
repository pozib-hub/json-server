import { IProfile } from "../core/types"
import DataBase from "../core/DataBase"

class ProfileService {
    async get(id?: string) {
        const profiles = await DataBase.read("profiles")
        return profiles.find(p => p.id == id)
    }

    async update(id: string, profile: IProfile) {
        const profiles = await DataBase.read("profiles")
        const currProfile = profiles.find(p => p.id === id)

        if (!currProfile) {
            throw new Error(`Profile with id ${id} not found`)
        }

        await DataBase.write("profiles", profiles.map(p => {
            if (p.id === id) {
                return { ...p, ...profile }
            }

            return p
        }))
    }
}

export default new ProfileService()