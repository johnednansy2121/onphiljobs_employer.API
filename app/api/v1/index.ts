import { Application } from "express";
import UserRoutes from './user.routes'
import TestRoutes from './test.routes'
import ClientRoutes from './client.routes'
import swaggerUi from 'swagger-ui-express'
import SwaggerOptions from "../../swagger";
import ProfileRoutes from '../v1/profile.routes'
import TalentRoutes  from './talents.routes'
import JobRoutes from './job.routes'
import ApplicationRoutes from './application.routes'

const environment : string = <string>process.env.NODE_ENV || 'development'

export default (app: Application) => {
    const basePath = '/api/v1'

    app.use(basePath + '/user', UserRoutes)   

    app.use(basePath + '/test', TestRoutes)

    app.use(basePath + '/client', ClientRoutes)

    app.use(basePath + '/profile', ProfileRoutes)
    
    app.use(basePath + '/people', TalentRoutes)

    app.use(basePath + '/job', JobRoutes)
    
    app.use(basePath + '/application', ApplicationRoutes)

    if(environment.toUpperCase() !== 'PRODUCTION') {
        app.use('/docs', swaggerUi.serve, swaggerUi.setup(SwaggerOptions))

        app.get('/', (req, res) => {
            res.redirect('/docs')
        })
    }
        
}