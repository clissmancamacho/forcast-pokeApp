'use strict'

/* Global Imports */
import mongoose from 'mongoose'
import api from './api'
import Debug from 'debug'
import chalk from 'chalk'
import dotenv from 'dotenv'
import { handleFatalError } from './util/'
import createData from './basic-data/'

/* Config Vars */
dotenv.config()
const debug = new Debug('nodejs-pokeApp-backend:root')
mongoose.Promise = global.Promise

/* Config HandleErrors in server */
process.on('uncaughtException', handleFatalError)
process.on('unhandledRejection', handleFatalError)

async function start () {
  mongoose.set('useCreateIndex', true)
  await mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true })
  await createData()
  api.listen(process.env.PORT, () => {
    debug(
      chalk`{green.bold API Server listening on http://localhost:${process.env.PORT} 🆗}`
    )
    debug(chalk`{magenta.bold ProcessID: ${process.pid}}`)
  })
}

start()
