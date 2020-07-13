import { IJob, IJobCreateRequest } from "../../models/job";
import { IRequestUser } from "../../schema/IUser";
import { PartnersDBConnect } from "../../configuration/database";
import loadModels from "../../models/loadModels";

export default async(data : IJobCreateRequest, user: IRequestUser) : Promise<IJob> => {
    try {
        const db = await PartnersDBConnect()

        const { JobModel } = loadModels(db)

        const { client, title, subtitle, section, details, status, premium } = data

        await JobModel.ensureIndexes({ 'geoLocation': '2dsphere' })

        const geoLocation = {
            type: 'Point',
            coordinates: []
        }

        if(!details.isWorkFromHome) {
            //@ts-ignore
            geoLocation.coordinates = [details.location.long, details.location.lat]
        }

        const result = await JobModel.create({
            title,
            subtitle,
            section,
            details,
            status,
            premium,
            geoLocation,
            metadata: {
                client,
                organization: user.context,
                createdBy: user.id,
                dateCreated: new Date(),
                publishedDate: new Date()
            }
        })

        return result

    } catch(err){
        throw new Error(err.message)
    }
}