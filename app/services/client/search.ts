import { SearchResult } from "../../schema/Result"
// import ClientModel, { IClient } from "../../models/client"
import { ISearchRequest } from "../../utilities/SearchRequest"
import { IRequestUser } from "../../schema/IUser"
import { IClient } from "../../models/client"
import { PartnersDBConnect } from "../../configuration/database"
import loadModels from "../../models/loadModels"


export default async(searchRequest: ISearchRequest, user: IRequestUser): Promise<SearchResult<IClient>> =>  {
    try {
        const db = await PartnersDBConnect()
        const { ClientModel } = loadModels(db)
        const finalFilter : any = searchRequest.filter
        finalFilter['metadata.organization'] = user.context
        
        const allItems = await ClientModel.find(finalFilter)
        
        const offset = (searchRequest.pageNum - 1) * searchRequest.pageSize

        let items : IClient[] = []
        if(searchRequest.orderBy !== '')
            items = await ClientModel.find(finalFilter).skip(offset).limit(searchRequest.pageSize).sort(searchRequest.orderBy)
        else 
            items = await ClientModel.find(finalFilter).skip(offset).limit(searchRequest.pageSize)

        return {
            Items: items,
            Successful: true,
            TotalItems : allItems.length,
            PageNum : searchRequest.pageNum,
            PageSize : searchRequest.pageSize,
            Message : 'Successfully called search'
        }
    } catch(err) {
        throw new Error(err.message)
    }
}