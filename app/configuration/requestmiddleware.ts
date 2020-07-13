import { NextFunction} from "express"
import { ObjectSchema } from '@hapi/joi'
import { Result } from "../schema/Result"

const  RequestMiddleware = (schema: ObjectSchema) => {
    return (req: any, res : any, next : NextFunction) => {
        try {

            const request = req.body

            const validationResult = schema.validate(request)

            if(validationResult.error) {
                const result = new Result<boolean>().Failed(<string>validationResult.error.details[0].message)
                res.status(400).json(result)
            }
            else {
                next()
            }
            
    
        } catch(err) {
            const result = new Result<boolean>().Failed(<string>err.message)
            res.status(400).json(result)
        }
    }
} 

export default RequestMiddleware
      