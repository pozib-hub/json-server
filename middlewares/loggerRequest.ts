import { NextFunction, Request, Response } from 'express'

export function loggerRequest(req: Request, res: Response, next: NextFunction) {
    console.log(`Request ${req.method} ${req.url}`)
    next()
}
