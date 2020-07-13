import express, { Application } from 'express'
import dotenv from 'dotenv'

dotenv.config()

import middleware  from './configuration/middleware'
import apiRoutes from './api/v1/'


const app : Application = express()
const PORT = process.env.PORT || 3000

middleware(app)
apiRoutes(app)

app.get('/healthcheck', (req, res) => {
    res.json('healthy instance. try again for redoplyment. test sns topic.')
})

app.listen(PORT, () => {
    console.log(`
=================================================
OT FLLAIR PARTNERS IS RUNNING : ${new Date()} 
=================================================
    `)
})