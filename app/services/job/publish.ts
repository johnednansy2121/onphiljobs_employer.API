import { IRequestUser } from "../../schema/IUser";
import { PartnersDBConnect } from "../../configuration/database";
import loadModels from "../../models/loadModels";

export default async(id: string, user: IRequestUser) : Promise<boolean> => {
    try {
        const db = await PartnersDBConnect()

        const { JobModel } = loadModels(db)

        const jobResult = await JobModel.findOne({ _id: id, 'metadata.organization': user.context })

        if(!jobResult) throw new Error(`Record not found with id of ${id}`)

        await JobModel.update({ _id: id }, {
            $set: {
                status: 'PUBLISHED',
                metadata: {
                    organization: user.context,
                    client: jobResult.metadata.client,
                    createdBy: jobResult.metadata.createdBy,
                    dateCreated: jobResult.metadata.dateCreated,
                    dateUpdated: new Date(),
                    publishDate: new Date()
                }
            }
        })

        return true
    } catch(err) {
        throw new Error(err.message)
    }
}