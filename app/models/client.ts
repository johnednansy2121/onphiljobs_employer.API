import { Document, Schema, model } from "mongoose";
import { IMetadataWithOwnership } from "../schema/IMetadata";


interface IMetadataWithOrganization extends IMetadataWithOwnership {
    organization: string
}

export interface IClient extends Document {
    name: string,
    metadata: IMetadataWithOrganization
}

export const ClientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    metadata: {
        organization: {
            type: Schema.Types.ObjectId,
            ref: 'organization'
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        dateCreated: {
            type: Date
        },
        dateUpdated: {
            type: Date
        },
        updatedBy: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    }
})
