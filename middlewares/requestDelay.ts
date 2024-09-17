import { NextFunction, Request, Response } from "express"

async function requestDelay(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    await new Promise((res) => {
        setTimeout(res, 800)
    })

    return next()
}

export default requestDelay
