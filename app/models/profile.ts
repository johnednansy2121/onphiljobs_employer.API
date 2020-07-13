import { Document, Schema, model } from "mongoose";



export interface IProfile extends Document {
    firstName: string,
    lastName: string,
    avatarUrl: string,
    fullName: string,
    metadata: {
        organization: string,
        user: string,
        dateCreated: Date,
        dateUpdated: Date
    }
}

export interface IProfileWithScope extends IProfile {
    scopes: string[]
}

export const ProfileSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    avatarUrl: {
        type: String,
        default: ''
    },
    fullName: {
        type: String,
    },
    metadata: {
        organization: {
            type: Schema.Types.ObjectId,
            ref: 'organization'
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        dateCreated: {
            type: Date
        },
        dateUpdated: {
            type: Date
        }
    }
})
