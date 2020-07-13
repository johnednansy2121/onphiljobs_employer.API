import { IRequestUser } from "../../schema/IUser";
import { IClient } from "../../models/client";
import { PartnersDBConnect } from "../../configuration/database";
import loadModels from "../../models/loadModels";

interface IRequestClient {
    name: string
}

export default async(data: IRequestClient, user: IRequestUser) : Promise<IClient> => {
    try {
        const db = await PartnersDBConnect()
        const { ClientModel } = loadModels(db)
        const createResult = await ClientModel.create({
            name: data.name,
            metadata: {
                organization: user.context,
                dateCreated: new Date(),
                createdBy: user.id
            }
        })

        return createResult
    } catch(err) {
        throw new Error(err.message)
    }
}