import { NextFunction, Request, Response } from "express"
import UserSettingsService from "../services/UserSettingsService"
import ApiError from "../exceptions/ApiError"

class UserSettingsController {
    async get(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { key } = req.query

            const { user } = req.body
            const userId = user.id

            const userSetting = await UserSettingsService.get(userId, key as string)

            return res.json({
                key,
                value: userSetting
            })
        } catch (error) {
            console.log(error)
            const err = error as any //strick
            return res.status(500).json({ message: err.message })
        }
    }

    async update(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { key } = req.params

            const { user, value } = req.body
            const userId = user.id

            await UserSettingsService.update(userId, key as string, value)

            const newUserSetting = await UserSettingsService.get(userId, key as string)

            return res.json({
                key,
                value: newUserSetting
            })
        } catch (error) {
            console.log(error)
            const err = error as any //strick
            return res.status(500).json({ message: err.message })
        }
    }

    async delete(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { key } = req.params

            const { user, value } = req.body
            const userId = user.id

            await UserSettingsService.delete(userId, key as string)

            return res.json({ message: "ok" })
        } catch (error) {
            console.log(error)
            const err = error as any //strick
            return res.status(500).json({ message: err.message })
        }
    }

    async create(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { key } = req.params

            const { user, value } = req.body
            const userId = user.id

            const newUserSetting = await UserSettingsService.create(userId, key as string, value)

            return res.json({
                key,
                value: newUserSetting
            })
        } catch (error) {
            console.log(error)
            const err = error as any //strick
            return res.status(500).json({ message: err.message })
        }
    }
}

export default new UserSettingsController()
