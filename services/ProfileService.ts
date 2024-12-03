import { IProfile } from '../core/types'
import DataBase from '../core/DataBase'

class ProfileService {
    async get(id: string) {
        const profiles = await DataBase.read('profiles')

        const profile = profiles.find((p) => p.id === id)

        if (!profile) {
            return null
        }

        const subdivisionId = profile.subdivision?.id
        const addressId = profile.address?.id

        const subdivisions = await DataBase.read('subdivisions')

        const subdivision = subdivisions.find((s) => s.id === subdivisionId)

        if (subdivision) {
            profile.subdivision = {
                id: subdivision.id,
                name: subdivision.name,
            }
        } else {
            profile.subdivision = null
        }

        const address = subdivision?.addresses.find((a) => a.id === addressId)

        if (address) {
            profile.address = {
                id: address.id,
                name: address.name,
            }
        } else {
            profile.address = null
        }

        return profile
    }

    async update(id: string, profile: IProfile) {
        const profiles = await DataBase.read('profiles')
        const currProfile = profiles.find((p) => p.id === id)

        if (!currProfile) {
            throw new Error(`Profile with id ${id} not found`)
        }

        const newProfiles = profiles.map((p) => {
            if (p.id === id) {
                return { ...p, ...profile }
            }

            return p
        })

        await DataBase.write('profiles', newProfiles)
    }
}

export default new ProfileService()
