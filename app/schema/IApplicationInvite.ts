import { Document } from "mongoose";
import { IApplicant } from "./IApplication";

export interface IApplicationInvite extends Document {
    applicantId: string
    jobId: string
    status: string
    metadata: {
        user: string
        organization: string
        dateCreated: Date
        dateUpdated: Date
    }
}

export interface IJobInviteCreate {
    applicantId: string
    jobId: string
}

export interface IJobInviteItem {
    _id: string
    applicant: IApplicant
    jobId: string
    status: string
    metadata: {
        dateCreated: Date
        dateUpdated: Date
    }
}