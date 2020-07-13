import { Schema } from 'mongoose'

export const ApplicationInviteSchema = new Schema({
    applicantId: {
        type: String,
        required: true
    },
    jobId: {
        type: String,
        required: true
    },
    status: {
        type: String,
    },
    metadata: {
        organization: {
            type: String,
            ref: 'organization'
        },
        actor: {
            type: String,
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

