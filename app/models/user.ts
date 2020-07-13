import { Schema, model, startSession } from 'mongoose'
import IUser, { IUserWithFullScope } from '../schema/IUser'

export const userSchema : Schema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    organizationId: {
        type: Schema.Types.ObjectId,
        ref: 'organization'
    },
    roles: [
        {
            type: Schema.Types.ObjectId,
            ref: 'role'
        }
    ],
    metadata: {
        dateCreated: {
            type: Date
        },
        dateUpdated: {
            type: Date
        }
    }
})
