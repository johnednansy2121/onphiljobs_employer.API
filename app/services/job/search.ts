import { ISearchRequest } from "../../utilities/SearchRequest";
import { SearchResult } from "../../schema/Result";
import { IJobListItem, IJob } from "../../models/job";
import { PartnersDBConnect } from "../../configuration/database";
import loadModels from "../../models/loadModels";
import { IRequestUser } from "../../schema/IUser";

export default async(searchRequest: ISearchRequest, user: IRequestUser): Promise<SearchResult<IJobListItem>> => {
    try {
        const db = await PartnersDBConnect()

        const { JobModel } = loadModels(db)

        searchRequest.filter['metadata.organization'] = user.context

        const totalSearchItems = await JobModel.find(searchRequest.filter)

        const offset = (searchRequest.pageNum - 1) * searchRequest.pageSize

        let searchItems : IJob[] = []
        if(searchRequest.orderBy !== null) {
            searchItems = await JobModel.find(searchRequest.filter)
                .sort(searchRequest.orderBy)
                .limit(searchRequest.pageSize)
                .skip(offset)
        } else {
            searchItems = await JobModel.find(searchRequest.filter)
                .limit(searchRequest.pageSize)
                .skip(offset)
        }

        const list: IJobListItem[] = []
        
        searchItems.forEach(item => {
            list.push({
                _id: item._id,
                title: item.title,
                subtitle: item.subtitle,
                status: item.status,
                metadata: {
                    dateCreated: item.metadata.dateCreated,
                    dateUpdated: item.metadata.dateUpdated
                }
            })
        })

        return {
            Items: list,
            TotalItems: totalSearchItems.length,
            Successful: true,
            PageSize: searchRequest.pageSize,
            PageNum: searchRequest.pageNum,
            Message: 'Successfully retrieve records.'
        }

    } catch(err) {
        throw new Error(err.message)
    }
}