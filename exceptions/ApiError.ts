export default class ApiError extends Error {
    status?: number
    errors?: string | string[]

    constructor(status?: number, message?: string, errors?: string | string[]) {
        super(message)
        this.status = status
        this.errors = errors
    }

    static Unauthorized() {
        return new ApiError(401, 'Пользователь не авторизован')
    }

    static BadRequest(message: string, errors: string | string[] = []) {
        return new ApiError(400, message, errors)
    }
} 