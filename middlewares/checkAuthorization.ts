import { NextFunction, Request, Response } from "express"

import ApiError from '../exceptions/ApiError'

function checkAuthorization(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    if (!req.headers.authorization) {
        return res.status(403).json({ message: 'AUTH ERROR' })
    }

    return next()
}

export default checkAuthorization
