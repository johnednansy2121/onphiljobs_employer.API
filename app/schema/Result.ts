class BaseResult {
    Message: string
    Successful: boolean

    constructor(message: string, successful: boolean) {
        this.Message = message
        this.Successful = successful
    }
}

export class Result<T> extends BaseResult {
    Data?: T
    
    constructor() {
        super('', false)
    }

    Success(message: string, successful: boolean, data?: T) {
        this.Message = message
        this.Successful = successful
        this.Data = data

        return this
    }

    Failed(message: string) {
        this.Successful = false
        this.Message = message

        return this
    }
}


export class SearchResult<T> extends BaseResult {
    Items: T[]
    PageSize: number
    PageNum: number
    TotalItems: number

    constructor() {
        super('', false)
        this.Items = []
        this.PageSize = 20
        this.PageNum = 1
        this.TotalItems = 0
    }
}