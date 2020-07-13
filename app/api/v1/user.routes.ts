import { Router } from 'express'
import { UserService } from '../../services'
import { Result } from '../../schema/Result'
import ResponseMiddleWare from '../../configuration/responsemiddleware'
import RequestMiddleware from '../../configuration/requestmiddleware'
import RequestSchema from '../../schema/request'

const routes = Router()

// routes.post('/signup', async(req :any, res, next) => {
//     try {
//         const result = await UserService.SignUp(req.body)
//         req.locals = new Result<boolean>().Success('Succesfully signed user.', true, result)
//     } catch(err) {
//         req.locals = new Result<boolean>().Failed(err.message)
//     }
//     finally {
//         next()
//     }
// }, ResponseMiddleWare)


routes.post('/login', RequestMiddleware(RequestSchema.UserLogin), async(req: any, res, next) => {
    try {
        const result = await UserService.Login(req.body)
        req.locals = new Result<string>().Success('Successfully logged in.', true, result)
    } catch(err) {
        req.locals = new Result<string>().Failed(err.message)
    } finally {
        next()
    }
}, ResponseMiddleWare)

export default routes