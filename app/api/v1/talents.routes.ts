import { Router } from "express";
import authorization from "../../configuration/authorization";
import ResponseMiddleWare from "../../configuration/responsemiddleware";
import { Result } from "../../schema/Result";
import { TalentService } from "../../services";
import { SearchRequestBuilder, orderByBuilder } from "../../utilities/SearchRequest";

const routes = Router()

routes.post('/search', authorization('Talent.Search'), async(req: any, res, next) => {
    try {

        const request = req.body
        const result = await TalentService.search(request.tags, request.pageSize, request.pageNum,  orderByBuilder(request.orderBy))

        req.locals = result
    } catch(err) {
        req.locals = new Result<string>().Failed(err.message)
    } finally {
        next()
    }
}, ResponseMiddleWare)

export default routes