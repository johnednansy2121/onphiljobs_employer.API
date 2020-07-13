import { Router, NextFunction } from "express";
import authorization from "../../configuration/authorization";
import ResponseMiddleWare from "../../configuration/responsemiddleware";
import { Result } from "../../schema/Result";


const routes = Router()



routes.get('/jobs', authorization('Job.Search'), (req: any, res, next: NextFunction) => {
    try {
        req.locals = new Result<boolean>().Success('You are able to get here', true, true)
    } catch(err) {
        req.locals = new Result<boolean>().Failed(err.message)
    } 
    finally {
        next()
    }
}, ResponseMiddleWare)


routes.get('/talents', authorization('Talent.Search'), (req: any, res, next: NextFunction) => {
    try {
        req.locals = new Result<boolean>().Success('You are able to get here', true, true)
    } catch(err) {
        req.locals = new Result<boolean>().Failed(err.message)
    } 
    finally {
        next()
    }
}, ResponseMiddleWare)


export default routes