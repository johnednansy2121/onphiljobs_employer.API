import { createConnection, Connection } from "mongoose";
import { FllairEducationSchema, FllairSkillSchema, FllairAchievementSchema, FllairExperienceSchema, FllairUserProfileSchema, FllairUserSchema } from "../models/fllair";


export const FllairDBConnection = () => createConnection(<string>process.env.MONGO_URL_FLLAIR, { useNewUrlParser: true, useUnifiedTopology: true })

export const LoadFllairModels = (db : any) => {
    db.model('user.education', FllairEducationSchema)
    db.model('user.skill', FllairSkillSchema)
    db.model('user.achievement', FllairAchievementSchema)
    db.model('user.experience', FllairExperienceSchema)
    db.model('user.profile', FllairUserProfileSchema)
    db.model('user', FllairUserSchema)
}

export const FllairModel = (db: Connection) => {
    return {
        UserEducationModel:  db.model('user.education', FllairEducationSchema),
        UserSkillModel:  db.model('user.skill', FllairSkillSchema),
        UserAchievementModel: db.model('user.achievement', FllairAchievementSchema),
        UserExperienceModel: db.model('user.experience', FllairExperienceSchema),
        FllairUserProfileModel: db.model('user.profile', FllairUserProfileSchema),
        FllairUserModel: db.model('user', FllairUserSchema)
    }
}