import dotenv from 'dotenv'
import app from './app'
import 'reflect-metadata'
import { createConnection } from 'typeorm'

dotenv.config()

const port: Number = Number(process.env.PORT) || 4000

createConnection()

app.listen(port, () => {
  console.log('🏃 Running Server')
})
