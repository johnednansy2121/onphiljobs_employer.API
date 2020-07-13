import { IRequestUser, IUserWithFullScope } from '../../schema/IUser'
import { IProfileWithScope } from '../../models/profile' 
import { PartnersDBConnect } from '../../configuration/database'
import loadModels from '../../models/loadModels'

let Models : any = {}

const getUserDetails = async(userId: string) => {
    try {
        const user = await Models.UserModel.findOne({ _id: userId })
            .populate('roles')
            .populate({
                path: 'roles',
                populate: {
                    path: 'scopes',
                    component: 'scope'
                }
            })

        if(!user) throw new Error('cannot find user.')
        

        return user
        

    } catch(err) {
        throw new Error(err.message)
    }
}

const extractScopes = (user: IUserWithFullScope) : string[] => {
    const scopeList = user.roles.map(x => x.scopes.map(y => y.name))
    const scopes: string[]= []
    scopeList.forEach(scope => {
        scopes.push(...scope)
    })

    return scopes
} 

export default  async(user: IRequestUser) => {
    try {
        const db = await PartnersDBConnect()
        Models = loadModels(db)
        const profile = await Models.ProfileModel.findOne({ 'metadata.user': user.id })

        if(!profile) throw new Error('Cannot found profile.')

     

        const userDetails = await getUserDetails(user.id)

        const scopes = extractScopes(userDetails as IUserWithFullScope)
   
        const result = {
            _id: profile._id,
            metadata: profile.metadata,
            firstName: profile.firstName,
            lastName: profile.lastName,
            fullName: profile.fullName,
            avatarUrl: profile.avatarUrl,
            scopes
        }

        console.log(result)

        return result as IProfileWithScope

    } catch(err) {
        throw new Error(err.message)
    }
}