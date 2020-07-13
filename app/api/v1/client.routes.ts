import { Router, NextFunction } from "express";
import authorization from "../../configuration/authorization";
import RequestMiddleware from "../../configuration/requestmiddleware";
import RequestSchema from "../../schema/request";
import ResponseMiddleWare from "../../configuration/responsemiddleware";
import { IClient } from "../../models/client";
import { Result } from "../../schema/Result";
import { ClientService } from "../../services";
import { SearchRequestBuilder } from "../../utilities/SearchRequest";


const routes = Router()

routes.post('', authorization('Client.Create'), RequestMiddleware(RequestSchema.NewClientRequest), async(req : any, res, next) => {
    try {
        const result = await ClientService.Add(req.body, req.user)

        req.locals = new Result<IClient>().Success('Successfully created client.', true, result)

    } catch(err) {
        req.locals = new Result<IClient>().Failed(err.message)
    } finally {
        next()
    }
    
}, ResponseMiddleWare)

routes.get('', authorization('Client.Search'), async(req : any, res, next: NextFunction) => {
    try {
        const result = await ClientService.SearchClient(SearchRequestBuilder(req.query), req.user)

        req.locals = result

    } catch(err) {
        req.locals = {
            Successful: false,
            Message: err.message
        }
    } finally {
        next()
    }
}, ResponseMiddleWare)

export default routes