import { IRequestUser } from "../../schema/IUser";
import { IApplication } from "../../schema/IApplication";
import { Result } from "../../schema/Result";
import { PartnersDBConnect } from "../../configuration/database";
import loadModels from "../../models/loadModels";

export default async(applicationId: string, status: string, user: IRequestUser) : Promise<Result<IApplication>> => {
    try {
        const db = await PartnersDBConnect()

        const { ApplicationModel, JobModel } = loadModels(db)

        const applicationDetails = await ApplicationModel.findById(applicationId)

        if(!applicationDetails) throw new Error('Application not found with id of ' + applicationId)

        const jobDetails = await JobModel.findOne({ _id: applicationDetails.job, 'metadata.organization': user.context })

        if(!jobDetails) throw new Error('Job is not found with id of ' + applicationDetails.job)

        applicationDetails.metadata.dateUpdated = new Date()
        applicationDetails.metadata.updatedBy = user.id

        await ApplicationModel.update({ _id: applicationId },{
            $set: {
                status: status.toUpperCase(),
                metadata: {
                    ...applicationDetails.metadata
                }
            }
        })

        const updatedApplication = <IApplication> await ApplicationModel.findById(applicationId)

        return new Result<IApplication>().Success('Successfully ' + status + ' application', true, updatedApplication)

    } catch(err) {
        throw new Error(err.message)
    }
}