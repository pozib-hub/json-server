import { v4 } from 'uuid'

import DataBase from '../core/DataBase'
import { ISubdivision } from '../core/types'

class SubdivisionsService {
    async get(id: string, addressId?: string) {
        const subdivisions = await DataBase.read('subdivisions')

        if (!addressId) {
            return subdivisions.find((s) => s.id === id)
        }

        const subdivision = subdivisions.find((s) => {
            if (s.id === id) {
                return s.addresses.find((a) => a.id === addressId)
            }
        })

        return subdivision
    }

    async getAll(search: string, limit: number, offset: number) {
        let subdivisions = await DataBase.read('subdivisions')

        if (search) {
            subdivisions = subdivisions.filter((s) =>
                s.name.toLowerCase().includes(search.toLowerCase()),
            )
        }

        subdivisions = subdivisions.slice(offset, offset + limit)

        return subdivisions
    }

    async getTotalCount() {
        const subdivisions = await DataBase.read('subdivisions')
        return subdivisions.length
    }

    async update(newSubdivision: ISubdivision) {
        const subdivisions = await DataBase.read('subdivisions')

        const subdivisionInDb = subdivisions.find((s) => s.id === newSubdivision.id)

        if (!subdivisionInDb) {
            throw new Error(`Subdivision with id ${newSubdivision.id} not found`)
        }

        newSubdivision.addresses = newSubdivision.addresses.map((address) => {
            if (subdivisionInDb.addresses.find((dbAddress) => dbAddress.id === address.id)) {
                return address
            } else {
                const id = v4()

                if (newSubdivision.defaultAddressId === address.id) {
                    newSubdivision.defaultAddressId = id
                }

                return { ...address, id: id }
            }
        })

        if (!newSubdivision.addresses.find((a) => a.id === newSubdivision.defaultAddressId)) {
            newSubdivision.defaultAddressId = newSubdivision.addresses[0].id
            newSubdivision.defaultAddressName = newSubdivision.addresses[0].name
        }

        await DataBase.write(
            'subdivisions',
            subdivisions.map((s) => (s.id === newSubdivision.id ? { ...s, ...newSubdivision } : s)),
        )
    }

    async create(subdivision: ISubdivision) {
        const subdivisions = await DataBase.read('subdivisions')
        subdivision.id = v4()
        subdivision.addresses = subdivision.addresses.map((address) => {
            const id = v4()

            if (address.id === subdivision.defaultAddressId) {
                subdivision.defaultAddressId = id
                subdivision.defaultAddressName = address.name
            }

            return { ...address, id: id }
        })

        if (!subdivision.defaultAddressId) {
            subdivision.defaultAddressId = subdivision.addresses[0].id
            subdivision.defaultAddressName = subdivision.addresses[0].name
        }

        await DataBase.write('subdivisions', [...subdivisions, subdivision])
    }

    async delete(id: string) {
        const subdivisions = await DataBase.read('subdivisions')

        await DataBase.write(
            'subdivisions',
            subdivisions.filter((s) => s.id !== id),
        )
    }
}

export default new SubdivisionsService()
