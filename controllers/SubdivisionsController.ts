import { NextFunction, Request, Response } from 'express'
import ApiError from '../exceptions/ApiError'

import SubdivisionsService from '../services/SubdivisionsService'
import { ISubdivision } from '../core/types'

class SubdivisionsController {
    async get(req: Request, res: Response) {
        try {
            const id = String(req.params.id ?? '')
            const addressId = String(req.query.addressId ?? '')

            if (!id) {
                throw ApiError.BadRequest('Вы не указали id подразделения')
            }

            const subdivision = await SubdivisionsService.get(id, addressId)

            return res.json(subdivision || null)
        } catch (error) {
            console.log(error)
            const err = error as any //strick
            return res.status(500).json({ message: err.message })
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const search = String(req.query.search || '')
            const page = Number(req.query.page || 1)
            const limit = Number(req.query.limit || 10)

            const offset = (page - 1) * limit

            const subdivisions = await SubdivisionsService.getAll(search, limit, offset)
            const totalCount = await SubdivisionsService.getTotalCount()

            return res.json({
                data: subdivisions,
                hasMore: subdivisions.length >= limit,
                totalCount: totalCount,
            })
        } catch (error) {
            console.log(error)
            const err = error as any //strick
            return res.status(500).json({ message: err.message })
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const form = req.body.value as ISubdivision

            await SubdivisionsService.create(form)
            const subdivision = await SubdivisionsService.get(form.id)

            return res.json(subdivision)
        } catch (error) {
            console.log(error)
            const err = error as any //strick
            return res.status(500).json({ message: err.message })
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const form = req.body.value as ISubdivision

            await SubdivisionsService.update(form)
            const subdivision = await SubdivisionsService.get(form.id)

            return res.json(subdivision)
        } catch (error) {
            console.log(error)
            const err = error as any //strick
            return res.status(500).json({ message: err.message })
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = String(req.params.id ?? '')

            await SubdivisionsService.delete(id)

            return res.json({ status: 'ok' })
        } catch (error) {
            console.log(error)
            const err = error as any //strick
            return res.status(500).json({ message: err.message })
        }
    }
}

export default new SubdivisionsController()
