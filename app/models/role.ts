import { Schema, model } from 'mongoose'
import IRole from '../schema/IRole'

export const RoleSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    scopes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'scope'
        }
    ],
    metadata: {
        dateCreated: {
            type: Date
        },
        dateUpdated: {
            type: Date
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        updatedBy: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    }
})

