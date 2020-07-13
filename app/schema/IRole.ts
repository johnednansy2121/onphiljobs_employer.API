import { Document } from "mongoose"
import { IMetadataWithOwnership } from "./IMetadata";
import IScope from "./IScope";

export default interface IRole extends Document {
    name: string,
    scopes: string[],
    metadata: IMetadataWithOwnership
}

export interface IRoleWithScope extends Document {
    name: string,
    scopes: IScope[],
    metadata: IMetadataWithOwnership
}