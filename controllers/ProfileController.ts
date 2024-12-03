import { NextFunction, Request, Response } from 'express'

import ProfileService from '../services/ProfileService'
import { IProfile } from '../core/types'
import ApiError from '../exceptions/ApiError'

class ProfileController {
    async get(req: Request, res: Response, next: NextFunction) {
        const { id } = req.query

        try {
            const profile = await ProfileService.get(id as string)

            if (!profile) {
                throw ApiError.BadRequest('Не найден профиль')
            }

            return res.json(profile)
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' })
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params

            const form: IProfile = req.body.form

            if (!form.address?.id) {
                return res.status(404).json({ message: 'addressId must be filled in' })
            }

            if (!form.subdivision?.id) {
                return res.status(404).json({ message: 'subdivisionId must be filled in' })
            }

            await ProfileService.update(id, form)

            const newProfile = await ProfileService.get(id)

            return res.json(newProfile)
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' })
        }
    }
}

export default new ProfileController()
