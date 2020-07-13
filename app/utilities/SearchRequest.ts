import { createFilter } from "odata-v4-mongodb"

export interface ISearchRequest {
    filter: any,
    pageNum: number,
    pageSize: number,
    orderBy: any
}

//@ts-ignore
export const SearchRequestBuilder = ({ $filter, $pageNum, $pageSize, $orderBy}) : ISearchRequest=> {
    let filter : any
    let pageNum = 1
    let pageSize = 20
    let orderBy : any = {}
   
    if($filter !== '' && $filter !== null && $filter !== undefined)
        filter = createFilter($filter)
    else {
        filter = {}
    }
    if($pageNum !== '' && $pageNum !== null && $pageNum !== undefined)
        pageNum = parseFloat($pageNum)    
    if($pageSize !== '' && $pageSize !== null && $pageSize !== undefined)
        pageSize = parseFloat($pageSize)
    if($orderBy !== ''  && $orderBy !== null && $orderBy !== undefined) {
        const orders = $orderBy.split(',')
        orders.forEach((order : string) => {
            const orderSplit = order.split(' ')

            orderBy[orderSplit[0]] = orderSplit[1].toLowerCase() === 'asc' ? 1 : -1
        })
    } else {
        orderBy = null
    }

    return {
        filter,
        pageNum,
        pageSize,
        orderBy
    }
} 

export const orderByBuilder = (orderBy : string): any => {
    let result: any = {}
    if(orderBy !== ''  && orderBy !== null && orderBy !== undefined) {
        const orders = orderBy.split(',')
        orders.forEach((order : string) => {
            const orderSplit = order.split(' ')

            result[orderSplit[0]] = orderSplit[1].toLowerCase() === 'asc' ? 1 : -1
        })
    } else {
        result = null
    }

    return result
}