import express from 'express'
import UserDto from '../dtos/UserDto'

export default function (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    try {
        const authHeader = req.headers.authorization

        req.body.user = JSON.parse(authHeader || "") || null
        next()
    } catch (error) {
        return next()
    }
}

