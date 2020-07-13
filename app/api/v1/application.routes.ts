import { Router, NextFunction } from "express";
import authorization from "../../configuration/authorization";
import ResponseMiddleWare from "../../configuration/responsemiddleware";
import { IApplication } from "../../schema/IApplication";
import { Result } from "../../schema/Result";
import { ApplicationService } from "../../services/application";

const routes = Router()

routes.put('/:id/considering', authorization('Application.Status.Change'), async(req: any, res: any, next: NextFunction) => {
    try {
        const { id } = req.params

        const result = await ApplicationService.ChangeStatus(id, 'considering', req.user)

        req.locals = result
    } catch(err) {
        req.locals = new Result<IApplication>().Failed(err.message)
    } finally {
        next()
    }
}, ResponseMiddleWare)

routes.put('/:id/shortlist', authorization('Application.Status.Change'), async(req: any, res: any, next: NextFunction) => {
    try {
        const { id } = req.params

        const result = await ApplicationService.ChangeStatus(id, 'shortlist', req.user)

        req.locals = result
    } catch(err) {
        req.locals = new Result<IApplication>().Failed(err.message)
    } finally {
        next()
    }
}, ResponseMiddleWare)

routes.put('/:id/declined', authorization('Application.Status.Change'), async(req: any, res: any, next: NextFunction) => {
    try {
        const { id } = req.params

        const result = await ApplicationService.ChangeStatus(id, 'declined', req.user)

        req.locals = result
    } catch(err) {
        req.locals = new Result<IApplication>().Failed(err.message)
    } finally {
        next()
    }
}, ResponseMiddleWare)


export default routes