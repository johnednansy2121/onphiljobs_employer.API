import { IRequestUser } from "../../schema/IUser";
import { Result } from "../../schema/Result";
import { IJobInviteCreate, IApplicationInvite } from "../../schema/IApplicationInvite";
import { PartnersDBConnect } from "../../configuration/database";
import loadModels from "../../models/loadModels";

export default async(data: IJobInviteCreate, user: IRequestUser) : Promise<Result<IApplicationInvite>> => {
    try {
        const db = await PartnersDBConnect()

        const { ApplicationInviteModel } = loadModels(db)
        
        const existingInvite = await ApplicationInviteModel.find({ applicantId: data.applicantId, jobId: data.jobId })

        if(existingInvite.length > 0) throw new Error('Applicant is already invited to the job.')

        const result = await ApplicationInviteModel.create({ applicantId: data.applicantId, jobId: data.jobId, status: 'PENDING', metadata: { 
            user: user.id,
            organization: user.context,
            dateCreated: new Date()
        }})

        return new Result<IApplicationInvite>().Success('Successfully created invite.', true, result)
    } catch(err) {
        throw new Error(err.message)
    }
}