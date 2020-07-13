import { Document } from "mongoose";

export default interface IScope extends Document {
    name: string,
    url: string
}