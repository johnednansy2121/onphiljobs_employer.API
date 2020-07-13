import { IJobEditRequest, IJob } from "../../models/job";
import { IRequestUser } from "../../schema/IUser";
import { Result } from "../../schema/Result";
import { PartnersDBConnect } from "../../configuration/database";
import loadModels from "../../models/loadModels";

export default async(data: IJobEditRequest, user: IRequestUser) : Promise<Result<IJob>> => {
    try {
        const db = await PartnersDBConnect()

        const { JobModel } = loadModels(db)

        await JobModel.ensureIndexes({ 'geoLocation': '2dsphere' })
        
        const searchJobDetails = await JobModel.findOne({ _id: data._id, 'metadata.organization': user.context })

        if(!searchJobDetails) throw new Error('Job not found with id of ' + data._id)

        const { client, title, subtitle, section, details, status, premium } = data

        const geoLocation = {
            type: 'Point',
            coordinates: []
        }

        if(!details.isWorkFromHome) {
            //@ts-ignore
            geoLocation.coordinates = [ details.location.long, details.location.lat ]
        }

        await JobModel.update({ _id: data._id }, {
            $set: {
                title,
                subtitle,
                section,
                details,
                status,
                premium,
                geoLocation,
                metadata: {
                    dateUpdated: new Date(),
                    client: client,
                    createdBy: searchJobDetails.metadata.createdBy,
                    dateCreated: new Date(searchJobDetails.metadata.dateCreated),
                    organization: user.context,
                    publishDate: searchJobDetails.metadata.publishDate ? new Date(searchJobDetails.metadata.publishDate) : new Date()
                }
            }
        })

        const updatedJobDetails = <IJob> await JobModel.findOne({ _id: data._id })

        return new Result<IJob>().Success("Successfully updated record.", true, updatedJobDetails)
    } catch(err) {
        throw new Error(err.message)
    }
} 