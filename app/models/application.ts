import { Schema, Types } from 'mongoose'


export const ApplicationSchema: Schema = new Schema({
    job: {
        type: Schema.Types.ObjectId,
        ref: 'job'
    },
    applicant: {
        type: Schema.Types.ObjectId
    },
    status: {
        type: String
    },
    metadata: {
        dateCreated: {
            type: Date
        },
        dateUpdated: {
            type: Date
        },
        updatedBy: {
            type: Types.ObjectId,
            ref: 'user'
        }
    }
})