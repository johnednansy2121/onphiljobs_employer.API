import IUser, { IUserLogin, IUserWithFullScope } from "../../schema/IUser";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import LoadModels from '../../models/loadModels'
import { PartnersDBConnect } from '../../configuration/database'
import { Model } from 'mongoose'


const comparePassword = async(password : string, encryptedPassword: string): Promise<boolean> => {
    try {
       const result = await compare(password, encryptedPassword)

       return result

    } catch(err) {
        throw new Error(err.message)
    }
}

const generateToken = async(user : IUserWithFullScope) : Promise<string> => {
    try {
        const scopeList = user.roles.map(x => x.scopes.map(y => y.name))
        const scopes: string[]= []
        scopeList.forEach(scope => {
            scopes.push(...scope)
        })
        const payload = {
            id: user._id,
            context: user.organizationId,
            scopes: [...new Set(scopes)]
        }

        const token = sign(payload, <string>process.env.JWT_KEY)

        return token
    } catch(err) {
        throw new Error(err.message)
    }
}

const getUserWithEmail = async(UserModel: Model<IUser>,email: string) => {
    try {
        const user = await UserModel.findOne({ email })
            .populate('roles')
            .populate({
                path: 'roles',
                populate: {
                    path: 'scopes',
                    component: 'scope'
                }
            })

        return user
    } catch(err) {
        throw new Error(err.message)
    }
}

const Login = async(data : IUserLogin) : Promise<string> => {
    try {
        const db = await PartnersDBConnect()

        const models = LoadModels(db);


        const possibleUsers = await getUserWithEmail(models.UserModel,data.email)
       
        if(!possibleUsers) throw new Error('Invalid credentials')

        const comparePasswordResult = await comparePassword(data.password, possibleUsers.password)
        
        if(!comparePasswordResult) throw new Error('Invalid credentials')

        const tokenRes = await generateToken(possibleUsers as IUserWithFullScope)
        
        return tokenRes

    } catch(err) {
        throw new Error(err.message)
    }
}



export default Login