import { IRequestUser } from "../../schema/IUser";
import { PartnersDBConnect } from "../../configuration/database";
import loadModels from "../../models/loadModels";

export default async(id: string, user: IRequestUser) : Promise<boolean> => {
    try {
        const db = await PartnersDBConnect()

        const { JobModel } = loadModels(db)

        const jobDetails = await JobModel.findOne({ _id: id, 'metadata.organization': user.context })

        if(!jobDetails) throw new Error(`Record not found with id of ${id}.`)

        jobDetails.metadata.dateUpdated = new Date()
        await JobModel.update({ _id: id }, {
            $set: {
                status: 'UNLISTED',
                metadata: {
                    ...jobDetails.metadata
                }
            }
        })

        return true
    } catch(err) {
        throw new Error(err.message)
    } 
}