import { IRequestUser } from "../../schema/IUser";
import { IJob } from "../../models/job";
import { PartnersDBConnect } from "../../configuration/database";
import loadModels from "../../models/loadModels";

export default async(id : string, user: IRequestUser) : Promise<IJob> => {
    try {
        const db = await PartnersDBConnect()
        const { JobModel } = loadModels(db)

        const result = await JobModel.findOne({ _id: id, 'metadata.organization': user.context })

        if(!result) throw new Error('Record not found with id of ' + id)

        return result

    } catch(err) {
        throw new Error(err.message)
    }
}