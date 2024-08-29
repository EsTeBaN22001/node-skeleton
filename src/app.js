import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import authRouter from './Routes/auth.routes.js'

export const app = express()

const corsOptions = {
  origin: ['http://localhost:4200'],
  methods: ['OPTIONS', 'GET', 'POST', 'PUT', 'DELETE']
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(morgan('dev'))
app.use('/uploads', express.static('uploads'))

app.use('/api/auth', authRouter)
