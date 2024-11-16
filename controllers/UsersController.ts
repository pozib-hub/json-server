import { NextFunction, Request, Response } from "express"

import UserService from '../services/UserService'
import ApiError from '../exceptions/ApiError'
import UsersService from "../services/UsersService"


class UsersController {

    async get(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { id } = req.body

            if (!id) {
                return res.status(404).json({ message: "Not Found" })
            }

            const userFromBd = await UsersService.getOne(id)

            if (!userFromBd) {
                throw ApiError.BadRequest('403')
            }

            return res.json(userFromBd)
        } catch (error) {
            const err = error as any //strick
            return res.status(403).json({ message: err.message })
        }
    }

    async getMe(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { user } = req.body

            if (!user) {
                return res.status(401)
            }

            const userFromBd = await UsersService.getOne(user.id)

            if (!userFromBd) {
                throw ApiError.BadRequest('403')
            }

            return res.json(userFromBd)
        } catch (error) {
            const err = error as any //strick
            return res.status(403).json({ message: err.message })
        }
    }


}

export default new UsersController()
