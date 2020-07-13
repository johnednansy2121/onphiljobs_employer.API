import { Router, NextFunction } from "express";
import authorization from "../../configuration/authorization";
import ResponseMiddleWare from "../../configuration/responsemiddleware";
import { Result } from "../../schema/Result";
import { IProfileWithScope } from "../../models/profile";
import { ProfileService } from "../../services";

const routes = Router()


routes.get('', authorization('Profile.Get'), async(req: any, res, next: NextFunction) => {
    try {  
        const result = await ProfileService.GetDetails(req.user)

        req.locals = new Result<IProfileWithScope>().Success('Successfully get user profile.', true, result)

    } catch(err) {
        req.locals = new Result<IProfileWithScope>().Failed(err.message)
    } finally {
        next()
    }
}, ResponseMiddleWare)


export default routes