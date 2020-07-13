import { Router, NextFunction } from "express";
import authorization from "../../configuration/authorization";
import RequestMiddleware from "../../configuration/requestmiddleware";
import { JobCreateRequest, JobEditRequest } from '../../schema/request/job'
import ResponseMiddleWare from "../../configuration/responsemiddleware";
import { Result, SearchResult } from "../../schema/Result";
import { IJob, IJobListItem } from "../../models/job";
import { JobService } from "../../services";
import { SearchRequestBuilder } from "../../utilities/SearchRequest";
import { IApplicationWithApplicant } from "../../schema/IApplication";
import { ApplicationService } from "../../services/application";
import { IApplicationInvite, IJobInviteItem } from "../../schema/IApplicationInvite";
import { JobInviteService } from "../../services/job.invite";

const routes = Router()

routes.post('', authorization('Job.Create'), RequestMiddleware(JobCreateRequest), async(req: any, res, next) => {
    try {
        const result = await JobService.create(req.body, req.user)

        req.locals = new Result<IJob>().Success('Successfully created job.', true, result)
    } catch(err) {
        req.locals = new Result<IJob>().Failed(err.message)
    } finally {
        next()
    }
}, ResponseMiddleWare)

routes.get('', authorization('Job.Search'), async(req: any, res, next) => {
    try {
        const result = await JobService.search(SearchRequestBuilder(req.query), req.user)

        req.locals = result
    } catch(err) {
        req.locals = {
            Message: err.message,
            Successful: false
        }
    } finally {
        next()
    }
}, ResponseMiddleWare)

routes.get('/:id', authorization('Job.Search'), async(req: any, res, next: NextFunction) => {
    try {
        const { id } = req.params

        const result = await JobService.get(id, req.user)

        req.locals = new Result<IJob>().Success('Successfully retreive record.', true, result)
    } catch(err) {
        req.locals = new Result<IJob>().Failed(err.message)
    } finally {
        next()
    }
}, ResponseMiddleWare)

routes.put('/:id/publish', authorization('Job.Create'), async(req: any, res, next: NextFunction) => {
    try {
        const { id } = req.params

        const result = await JobService.publish(id, req.user)

        req.locals = new Result<boolean>().Success('Successfully published job.', true, result)
    } catch(err) {
        req.locals = new Result<boolean>().Failed(err.message)
    } finally {
        next()
    }
}, ResponseMiddleWare)


routes.put('/:id/draft', authorization('Job.Create'), async(req: any, res, next: NextFunction) => {
    try {
        const { id } = req.params

        const result = await JobService.draft(id, req.user)

        req.locals = new Result<boolean>().Success('Successfully drafted job.', true, result)
    } catch(err) {
        req.locals = new Result<boolean>().Failed(err.message)
    } finally {
        next()
    }
}, ResponseMiddleWare)

routes.put('/:id/unlist', authorization('Job.Create'), async(req: any, res, next: NextFunction) => {
    try {
        const { id } = req.params

        const result = await JobService.unlist(id, req.user)

        req.locals = new Result<boolean>().Success('Successfully unlisted job.', true, result)
    } catch(err) {
        req.locals = new Result<boolean>().Failed(err.message)
    } finally {
        next()
    }
}, ResponseMiddleWare)

routes.put('', authorization('Job.Create'), RequestMiddleware(JobEditRequest), async(req: any, res, next: NextFunction) => {
    try {
        const result = await JobService.edit(req.body, req.user)

        req.locals = result
    } catch(err) {
        req.locals = new Result<IJob>().Failed(err.message)
    } finally {
        next()
    }
}, ResponseMiddleWare)

routes.get('/:id/applicant/all', authorization('Job.Search'), async(req: any, res, next: NextFunction) => {
    try {
        const { id } = req.params
        
        const result = await ApplicationService.SearchByStatus(id, 'all', req.user)

        req.locals = result
    } catch(err) {
        req.locals = new Result<IApplicationWithApplicant[]>().Failed(err.message)
    } finally {
        next()
    }
}, ResponseMiddleWare)

routes.get('/:id/applicant/applied', authorization('Job.Search'), async(req: any, res, next: NextFunction) => {
    try {
        const { id } = req.params
        
        const result = await ApplicationService.SearchByStatus(id, 'submitted', req.user)

        req.locals = result
    } catch(err) {
        req.locals = new Result<IApplicationWithApplicant[]>().Failed(err.message)
    } finally {
        next()
    }
}, ResponseMiddleWare)

routes.get('/:id/applicant/declined', authorization('Job.Search'), async(req: any, res, next: NextFunction) => {
    try {
        const { id } = req.params
        
        const result = await ApplicationService.SearchByStatus(id, 'declined', req.user)

        req.locals = result
    } catch(err) {
        req.locals = new Result<IApplicationWithApplicant[]>().Failed(err.message)
    } finally {
        next()
    }
}, ResponseMiddleWare)

routes.get('/:id/applicant/withdrawn', authorization('Job.Search'), async(req: any, res, next: NextFunction) => {
    try {
        const { id } = req.params
        
        const result = await ApplicationService.SearchByStatus(id, 'withdrawn', req.user)

        req.locals = result
    } catch(err) {
        req.locals = new Result<IApplicationWithApplicant[]>().Failed(err.message)
    } finally {
        next()
    }
}, ResponseMiddleWare)

routes.get('/:id/applicant/considering', authorization('Job.Search'), async(req: any, res, next: NextFunction) => {
    try {
        const { id } = req.params
        
        const result = await ApplicationService.SearchByStatus(id, 'considering', req.user)

        req.locals = result
    } catch(err) {
        req.locals = new Result<IApplicationWithApplicant[]>().Failed(err.message)
    } finally {
        next()
    }
}, ResponseMiddleWare)

routes.get('/:id/applicant/shortlist', authorization('Job.Search'), async(req: any, res, next: NextFunction) => {
    try {
        const { id } = req.params
        
        const result = await ApplicationService.SearchByStatus(id, 'shortlist', req.user)

        req.locals = result
    } catch(err) {
        req.locals = new Result<IApplicationWithApplicant[]>().Failed(err.message)
    } finally {
        next()
    }
}, ResponseMiddleWare)

routes.post('/:id/invites', authorization('Job.Search'), async(req: any, res, next: NextFunction) => {
    try {
        const result = await JobInviteService.Invite(req.body, req.user)

        req.locals = result
    } catch(err) {
        req.locals = new Result<IApplicationInvite>().Failed(err.message)
    } finally {
        next()
    }
}, ResponseMiddleWare)

routes.get('/:id/invites', authorization('Job.Search'), async(req: any, res, next: NextFunction) => {
    try {
        const result = await JobInviteService.SearchByJob(req.params.id, req.user)

        req.locals = result
    } catch(err) {
        req.locals = new Result<IJobInviteItem>().Failed(err.message)
    } finally {
        next()
    }
}, ResponseMiddleWare)

export default routes