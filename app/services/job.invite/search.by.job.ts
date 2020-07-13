import { IRequestUser } from "../../schema/IUser";
import { SearchResult, Result } from "../../schema/Result";
import { IJobInviteItem, IApplicationInvite } from "../../schema/IApplicationInvite";
import { FllairDBConnection, LoadFllairModels, FllairModel } from "../../utilities/FllairDBConnection";
import { PartnersDBConnect } from "../../configuration/database";
import loadModels from "../../models/loadModels";

export default async(jobId: string, user: IRequestUser): Promise<Result<IJobInviteItem[]>> => {
    try {
        const fllairdb = await FllairDBConnection()
        const partnersdb = await PartnersDBConnect()

        const { FllairUserProfileModel } = FllairModel(fllairdb)
        const { ApplicationInviteModel } = loadModels(partnersdb)

        const inviteSearchItemsResult = await ApplicationInviteModel.find({ jobId, 'metadata.organization': user.context })

        const applicantIds = inviteSearchItemsResult.map(item => item.applicantId)

        const profiles = await FllairUserProfileModel.find({ user: { $in: applicantIds } }).populate('user')

        const list: IJobInviteItem[] = []

        inviteSearchItemsResult.forEach((item : IApplicationInvite) => {
            const applicantProfile: any = profiles.filter((profile: any) => profile.user._id.toString() === item.applicantId.toString())[0]
            list.push({
                _id: item._id,
                status: item.status,
                jobId: item.jobId,
                applicant: {
                    _id: applicantProfile._id,
                    firstName: applicantProfile.firstName,
                    lastName: applicantProfile.lastName,
                    userName: applicantProfile.user.userName,
                    premium: {
                        hasProSubscription: applicantProfile.premium.hasProSubscription
                    }
                },
                metadata: {
                    dateCreated: item.metadata.dateCreated,
                    dateUpdated: item.metadata.dateUpdated
                }
            })
        })

        return new Result<IJobInviteItem[]>().Success('Successfully retrieve records.', true, list)
    } catch(err) {
        throw new Error(err.message)
    }
} 