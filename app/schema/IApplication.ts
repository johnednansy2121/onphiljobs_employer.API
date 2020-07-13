import { Document } from 'mongoose'

export interface IApplication extends Document {
    applicant: string
    job: string
    status: string
    metadata: {
        dateCreated: Date,
        dateUpdated: Date,
        updatedBy: string
    }
}

export interface IApplicant {
    _id: string
    firstName: string
    lastName: string
    userName: string
    premium: {
        hasProSubscription: boolean
    }
}

export interface IApplicationWithApplicant {
    _id: string
    applicant: IApplicant
    job: string
    status: string
    metadata: {
        dateCreated: Date,
        dateUpdated: Date,
        updatedBy: string
    }
}