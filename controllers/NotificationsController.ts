import { NextFunction, Request, Response } from "express"

import NotificationsService from '../services/NotificationsService'
import ApiError from '../exceptions/ApiError'

class NotificationsController {
    async get(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        const { user } = req.body
        const userId = user.id

        try {
            if (!userId) {
                throw ApiError.BadRequest("Не указан userId")
            }

            const notifications = await NotificationsService.get(String(userId))

            return res.json(notifications)
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error" })
        }
    }
}

export default new NotificationsController()
