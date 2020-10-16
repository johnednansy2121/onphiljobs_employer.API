import { IRequestUser } from "../../schema/IUser";
import { IApplicationWithApplicant, IApplication } from "../../schema/IApplication";
import { PartnersDBConnect } from "../../configuration/database";
import loadModels from "../../models/loadModels";
import { OnPhDBConnection, FllairModel } from "../../utilities/FllairDBConnection";
import { Result } from "../../schema/Result";



export default async(jobId: string, status: string, user: IRequestUser): Promise<Result<IApplicationWithApplicant[]>> => {
    try {
        const PartnersDB = await PartnersDBConnect()
        const FllairDB = await OnPhDBConnection()

        const { ApplicationModel, JobModel } = loadModels(PartnersDB) 
        const { FllairUserProfileModel } = FllairModel(FllairDB)

        const jobDetails = await JobModel.findOne({ _id: jobId, 'metadata.organization': user.context })

        if(!jobDetails) throw new Error('Job not found with id of ' + jobId)

        let applications: IApplication[]

        if(status.toUpperCase() === 'ALL') {
            applications = await ApplicationModel.find({ job: jobId })
        } else {
            applications = await ApplicationModel.find({ job: jobId, status: status.toUpperCase() })
        }
        
        const userIds: string[] = applications.map(x => x.applicant)

        const userProfiles = await FllairUserProfileModel.find({ user: { $in: userIds }}).populate('user')
        
        const result : IApplicationWithApplicant[] = []

        applications.forEach(item => {
            const applicant : any = userProfiles.filter((x: any) => x.user._id.toString() === item.applicant.toString())[0]
            result.push({
                _id: item._id,
                job: item.job,
                status: item.status,
                applicant: {
                    _id: applicant.user._id,
                    firstName: applicant.firstName,
                    lastName: applicant.lastName,
                    userName: applicant.user.userName,
                    premium: {
                        hasProSubscription: applicant.premium.hasProSubscription
                    }
                },
                metadata: {
                   ...item.metadata
                }
            })
        })

       

        return new Result<IApplicationWithApplicant[]>().Success('Successfully retrieve records', true, result)

    } catch(err) {
        throw new Error(err.message)
    }
}