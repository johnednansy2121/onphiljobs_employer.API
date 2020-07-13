import { Document, model, Schema } from 'mongoose'

export interface IOrganization extends Document {
    name: string
    roles: string[]
    scopes: string[]
}


export const OrganizationSchema = new Schema({
    name: {
        type: String
    },
    roles: [
        {
            type: Schema.Types.ObjectId,
            ref: 'role'
        }
    ],
    scopes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'scope'
        }
    ]
})

