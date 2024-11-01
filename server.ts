import express from 'express'
import cors from 'cors'

import checkAuthorization from './middlewares/checkAuthorization'
import requestDelay from './middlewares/requestDelay'
import router from './router'
import { dbConfig } from './core/DataBase'

// const server = jsonServer.create()
// const DataBaseJSON = jsonServer.router(dbConfig.path)
// server.use(jsonServer.defaults({}))
// server.use(jsonServer.bodyParser)

const server = express()

server.use(express.json())

server.use(
    cors({
        credentials: true,
        origin: process.env.CLIENT_URL,
    })
)
// server.use(requestDelay)
// проверяем, авторизован ли пользователь
// server.use(checkAuthorization)

server.use('/api', router)

// запуск сервера
server.listen(8000, () => {
    console.log('server is running on 8000 port')
})
