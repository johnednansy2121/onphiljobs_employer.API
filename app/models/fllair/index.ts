import { Schema, createConnection } from "mongoose";

const connection = createConnection(<string>process.env.MONGO_URL_FLLAIR, { useUnifiedTopology: true, useNewUrlParser: true })

export const FllairUserProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    displayPicture: {
        type: String
    },
    jobTitle: {
        type: String
    },
    premium: {
        hasProSubscription: {type: Boolean, default: false},     
        hasInterview: {type: Boolean, default: false},             
        interviewDate: {type: Date},                                
        isProfileVerified: {type: Boolean, default: false},         
        hasProofOfWorkingRights: {type: Boolean, default: false},   
    },
    aboutMe: {
        type: String
    },
    resume: {
        education: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user.education'
            }
        ],
        achievements: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user.achievement'
            }
        ],
        skills: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user.skill'
            }
        ],
        experience: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user.experience'
            }
        ]
    }
})

export const FllairEducationSchema = new Schema({
    institutionName: {
        type: String
    },
    metadata: {
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    }
})

export const FllairSkillSchema = new Schema({
    skillName: {
        type: String
    },
    metadata: {
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    }
})

export const FllairAchievementSchema = new Schema({
    achievementName: {
        type: String
    },
    metadata: {
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    }
})

export const FllairExperienceSchema = new Schema({
    jobTitle: {
        type: String
    },
    metadata: {
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    }
})

export const FllairUserSchema = new Schema({
    userName: {
        type: String
    }
})

