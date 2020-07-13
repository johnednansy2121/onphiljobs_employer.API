

export interface IMetadata {
    dateCreated: Date,
    dateUpdated: Date
}

export interface IMetadataWithOwnership extends IMetadata {
    createdBy: string,
    updatedBy: string
}