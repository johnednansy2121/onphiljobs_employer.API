import jwt from 'jsonwebtoken'
import { NextFunction } from 'express'


interface IJWT  {
    id: string,
    context: string
    scopes: string[]
}

export default (scope: string) => {
    return (req : any, res : any, next : NextFunction) => {
        try {
            const authorization : string = req.headers['authorization']
   
            if(!authorization) res.status(403).json({ Message: 'UNAUTHORIZED ACCESS', Susccessful: false })
            else {
                const authorizationArray = authorization.split(' ')
    
                if(authorizationArray.length <= 1) res.status(403).json({ Message: 'UNAUTHORIZED ACCESS', Susccessful: false })
                else {
                    const token = authorizationArray[1]
    
                    const decodedToken : IJWT = <IJWT>jwt.verify(token, <string>process.env.JWT_KEY)
    
                    if(!decodedToken.scopes.includes(scope)) res.status(403).json({ Message: 'UNAUTHORIZED ACCESS', Susccessful: false })
                    else {
                        req.user = decodedToken
                        next()
                    }
                }
            }
        } catch(err) {
            res.status(403).json({ Message: 'UNAUTHORIZED ACCESS', Susccessful: false })
        }
    }
}