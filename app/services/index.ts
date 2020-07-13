// import SignUp from './user/signup'
import Login from './user/login'
import Add from './client/add'
import SearchClient from './client/search'
import GetDetails from './profile/getdetails'
import SearchTalent from './talents/search'
import CreateJob from './job/create'
import SearchJob from './job/search'
import GetJob from './job/get'
import PublishJob from './job/publish'
import DraftJob from './job/draft'
import UnlistJob from './job/unlist'
import EditJob from './job/edit'

export const UserService = {
    // SignUp,
    Login
}

export const ClientService = {
    Add,
    SearchClient
}

export const ProfileService = {
   GetDetails
}

export const TalentService = {
    search: SearchTalent
}

export const JobService =  {
    create: CreateJob,
    search: SearchJob,
    get: GetJob,
    publish: PublishJob,
    draft: DraftJob,
    unlist: UnlistJob,
    edit: EditJob
}