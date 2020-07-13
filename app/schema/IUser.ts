import { Document } from 'mongoose'
import { IMetadata } from './IMetadata';
import IRole, { IRoleWithScope } from './IRole';

export default interface IUser extends Document {
    email: string,
    password: string,
    roles: string[] | IRoleWithScope[],
    organizationId: string,
    metadata: IMetadata
}

export interface IUserWithFullScope extends Document {
    email: string,
    password: string,
    roles: IRoleWithScope[],
    organizationId: string,
    metadata: IMetadata
}

export interface IUserSignUp {
    email: string,
    password: string,
    confirmPassword: string
}

export interface IUserLogin {
    email: string,
    password: string
}

export interface IRequestUser {
    id: string,
    context: string
}