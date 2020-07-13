import { Schema, model } from 'mongoose'
import IScope from '../schema/IScope'

export const ScopeSchema : Schema = new Schema({
    name: {
        type: String,
        required: true
    }
})
