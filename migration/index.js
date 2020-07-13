require('dotenv').config()
const { connect } = require('mongoose')
const bcrypt = require('bcryptjs')

const loadModels = require('../dist/models/loadModels')

const generateEncryptedPassword = async() => {
    const salt = await bcrypt.genSalt(10)

    const encryptedPassword = await bcrypt.hash('password123', salt)

    return encryptedPassword
}


module.exports = {
    down: () => {
        connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            connection.dropCollection('user').then(() => {
                return connection.dropCollection('role')
            })  
            .then(() => {
                return connection.dropCollection('scope')
            })
            .then(() => {
                return connection.dropCollection('organization')
            })
            .then(() => {
                return connection.dropCollection('profile')
            })
            .then(() => process.exit(0))
        })
    },
    up: async() => {
        const db = await connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        
        const { ScopeModel, RoleModel, OrganizationModel, UserModel, ProfileModel } = loadModels.default(db)

        const scopes = [
            {
                name: 'Talent.Search'
            },
            { 
                name: 'Talent.GetDetails'
            },
            {
                name: 'Job.Search'
            },
            {
                name: 'Job.Create'
            },
            {
                name: 'Job.Update'
            },
            {
                name: 'Client.Create'
            },
            {
                name: 'Client.Search'
            },
            {
                name: 'Profile.Get'
            }
        ]
        const scopeCreateResult = await ScopeModel.create(scopes)

        const scopeIds = scopeCreateResult.map(x => x._id)
        
        const roles = [
            {
                name: 'Recruiter',
                scopes: scopeIds,
                metadata: {
                    dateCreated: new Date()
                }
            },
            {
                name: 'Mentor',
                scopes: [scopeIds[0], scopeIds[1], scopeIds[6]],
                metadata: {
                    dateCreated: new Date()
                }
            }
        ]
        const roleCreateRes = await RoleModel.create(roles)

        const roleIds = roleCreateRes.map(x => x._id)

        const organizations = [
            {
                name: 'Optimum'
            }
        ]

        const organizationCreateRes = await OrganizationModel.create(organizations)

        const organizationIds = organizationCreateRes.map(x => x._id)
    
        const encryptedPassword = await generateEncryptedPassword()
    
        const users = [
            {
                email: 'recruiter1@optimum.com',
                password: encryptedPassword,
                organizationId: organizationIds[0],
                roles: [roleIds[0]],
                metadata: {
                    dateCreated: new Date(),
                }
            },
            {
                email: 'mentor1@optimum.com',
                password: encryptedPassword,
                organizationId: organizationIds[0],
                roles: [roleIds[1]],
                metadata: {
                    dateCreated: new Date()
                }
            }
        ]
    
        const usersRes = await UserModel.create(users)
        
        const userId = usersRes.map(x => x._id)

        const userProfiles = [
            {
                firstName: 'recruiter',
                lastName: 'optimum',
                fullName: 'recruiter optimum',
                metadata: {
                    organization: organizationIds[0],
                    user: userId[0],
                    dateCreated: new Date()
                }
            },
            {
                firstName: 'mentor',
                lastName: 'optimum',
                fullName: 'mentor optimum',
                metadata: {
                    organization: organizationIds[0],
                    user: userId[1],
                    dateCreated: new Date()
                }
            },
        ]

        await ProfileModel.create(userProfiles)

        process.exit(0)
    }
} 
