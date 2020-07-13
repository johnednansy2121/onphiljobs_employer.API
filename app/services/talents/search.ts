import { connect } from "mongoose"
import { ITagsSearch } from "../../schema/request/tags"
import { LoadFllairModels } from "../../utilities/FllairDBConnection"

interface ITagWithUsers  {
    hasSkill: boolean
    hasAchievement: boolean
    hasExperience: boolean
    hasEducation: boolean
    hasAboutMe: boolean
    skillUsers: string[]
    achievementUsers: string[]
    experienceUsers: string[]
    educationUsers: string[]
    aboutMeUsers: string[]
}

const getFinalUserId = (data: ITagWithUsers): string[] => {
    const finalUserIds: string[] = []
    if(data.hasSkill) {
        if(data.hasAchievement && data.hasEducation && data.hasExperience && data.hasAboutMe) {
            data.skillUsers.forEach(item => {
                if(data.achievementUsers.includes(item) && data.educationUsers.includes(item) && data.experienceUsers.includes(item) && data.aboutMeUsers.includes(item)) 
                    finalUserIds.push(item)
            })
        } else if(!data.hasAchievement && data.hasEducation && data.hasExperience && data.hasAboutMe) {
            data.skillUsers.forEach(item => {
                if(data.educationUsers.includes(item) && data.experienceUsers.includes(item) && data.aboutMeUsers.includes(item))
                    finalUserIds.push(item)
            })
        } else if (!data.hasAchievement && !data.hasEducation && data.hasExperience && data.hasAboutMe) {
            data.skillUsers.forEach(item => {
                if(data.experienceUsers.includes(item) && data.aboutMeUsers.includes(item))
                    finalUserIds.push(item)
            })
        } else if(!data.hasAchievement && !data.hasEducation && !data.hasExperience && data.hasAboutMe) {
            data.skillUsers.forEach(item => {
                if(data.aboutMeUsers.includes(item))
                    finalUserIds.push(item)
            })
        } else if (data.hasAchievement && !data.hasEducation && !data.hasExperience && !data.hasAboutMe) {
            data.skillUsers.forEach(item => {
                if(data.achievementUsers.includes(item))
                    finalUserIds.push(item)
            })
        } else if(!data.hasAchievement && data.hasEducation && !data.hasExperience && !data.hasAboutMe) {
            data.skillUsers.forEach(item => {
                if(data.educationUsers.includes(item))
                    finalUserIds.push(item)
            })
        } else if(!data.hasAchievement && !data.hasEducation && data.hasExperience && !data.hasAboutMe) {
            data.skillUsers.forEach(item => {
                if(data.experienceUsers.includes(item))
                    finalUserIds.push(item)
            })
        }
        else {
            data.skillUsers.forEach(item => finalUserIds.push(item))
        }
        return finalUserIds
    }
    if(data.hasAchievement) {
        if(data.hasSkill && data.hasEducation && data.hasExperience && data.hasAboutMe) {
            data.achievementUsers.forEach(item => {
                if(data.skillUsers.includes(item) && data.educationUsers.includes(item) && data.experienceUsers.includes(item) && data.aboutMeUsers.includes(item)) 
                    finalUserIds.push(item)
            })
        } else if(!data.hasSkill && data.hasEducation && data.hasExperience && data.hasAboutMe) {
            data.achievementUsers.forEach(item => {
                if(data.educationUsers.includes(item) && data.experienceUsers.includes(item) && data.aboutMeUsers.includes(item))
                    finalUserIds.push(item)
            })
        } else if (!data.hasSkill && !data.hasEducation && data.hasExperience && data.hasAboutMe) {
            data.achievementUsers.forEach(item => {
                if(data.experienceUsers.includes(item) && data.aboutMeUsers.includes(item))
                    finalUserIds.push(item)
            })
        } else if(!data.hasSkill && !data.hasEducation && !data.hasExperience && data.hasAboutMe) {
            data.achievementUsers.forEach(item => {
                if(data.aboutMeUsers.includes(item))
                    finalUserIds.push(item)
            })
        } else if(data.hasSkill && !data.hasEducation && !data.hasExperience && !data.hasAboutMe) {
            data.achievementUsers.forEach(item => {
                if(data.skillUsers.includes(item))
                    finalUserIds.push(item)
            })
        } else if(!data.hasSkill && data.hasEducation && !data.hasExperience && !data.hasAboutMe) {
            data.achievementUsers.forEach(item => {
                if(data.educationUsers.includes(item))
                    finalUserIds.push(item)
            })
        } else if(!data.hasSkill && !data.hasEducation && data.hasExperience && !data.hasAboutMe) {
            data.achievementUsers.forEach(item => {
                if(data.experienceUsers.includes(item))
                    finalUserIds.push(item)
            })
        }
        else {
            data.achievementUsers.forEach(item => finalUserIds.push(item))
        }
        return finalUserIds
    } if(data.hasExperience) {
        if(data.hasSkill && data.hasEducation && data.hasAchievement && data.hasAboutMe) {
            data.experienceUsers.forEach(item => {
                if(data.skillUsers.includes(item) && data.educationUsers.includes(item) && data.achievementUsers.includes(item) && data.aboutMeUsers.includes(item)) 
                    finalUserIds.push(item)
            })
        } else if(!data.hasSkill && data.hasEducation && data.hasAchievement && data.hasAboutMe) {
            data.experienceUsers.forEach(item => {
                if(data.educationUsers.includes(item) && data.achievementUsers.includes(item) && data.aboutMeUsers.includes(item))
                    finalUserIds.push(item)
            })
        } else if (!data.hasSkill && !data.hasEducation && data.hasAchievement && data.hasAboutMe) {
            data.experienceUsers.forEach(item => {
                if(data.achievementUsers.includes(item) && data.aboutMeUsers.includes(item))
                    finalUserIds.push(item)
            })
        } else if(!data.hasSkill && !data.hasEducation && !data.hasAchievement && data.hasAboutMe) {
            data.experienceUsers.forEach(item => {
                if(data.aboutMeUsers.includes(item))
                    finalUserIds.push(item)
            })
        } else if(data.hasSkill && !data.hasEducation && !data.hasAchievement && !data.hasAboutMe) {
            data.experienceUsers.forEach(item => {
                if(data.skillUsers.includes(item))
                    finalUserIds.push(item)
            })
        } else if(!data.hasSkill && data.hasEducation && !data.hasAchievement && !data.hasAboutMe) {
            data.experienceUsers.forEach(item => {
                if(data.educationUsers.includes(item))
                    finalUserIds.push(item)
            })
        } else if (!data.hasSkill && !data.hasEducation && data.hasAchievement && !data.hasAboutMe) {
            data.experienceUsers.forEach(item => {
                if(data.achievementUsers.includes(item))
                    finalUserIds.push(item)
            })
        }
        else {
            data.experienceUsers.forEach(item => finalUserIds.push(item))
        }
    } if(data.hasEducation) {
        if(data.hasSkill && data.hasExperience && data.hasAchievement && data.hasAboutMe) {
            data.educationUsers.forEach(item => {
                if(data.skillUsers.includes(item) && data.experienceUsers.includes(item) && data.achievementUsers.includes(item) && data.aboutMeUsers.includes(item))
                    finalUserIds.push(item)
            })
        } else if (!data.hasSkill && data.hasExperience && data.hasAchievement && data.hasAboutMe) {
            data.educationUsers.forEach(item => {
                if(data.experienceUsers.includes(item) && data.achievementUsers.includes(item) && data.aboutMeUsers.includes(item))
                    finalUserIds.push(item)
            })
        } else if(!data.hasSkill && !data.hasExperience && data.hasAchievement && data.hasAboutMe) {
            data.educationUsers.forEach(item => {
                if(data.achievementUsers.includes(item) && data.aboutMeUsers.includes(item))
                    finalUserIds.push(item)
            })
        } else if(!data.hasSkill && !data.hasExperience && !data.hasAchievement && data.hasAboutMe) {
            data.educationUsers.forEach(item => {
                if(data.aboutMeUsers.includes(item))
                    finalUserIds.push(item)
            })
        } else if(data.hasSkill && !data.hasExperience && !data.hasAchievement && !data.hasAboutMe) {
            data.educationUsers.forEach(item => {
                if(data.skillUsers.includes(item))
                    finalUserIds.push(item)
            })
        } else if(!data.hasSkill && data.hasExperience && !data.hasAchievement && !data.hasAboutMe) {
            data.educationUsers.forEach(item => {
                if(data.experienceUsers.includes(item))
                    finalUserIds.push(item)
            })
        } else if(!data.hasSkill && !data.hasExperience && data.hasAchievement && !data.hasAboutMe) {
            data.educationUsers.forEach(item => {
                if(data.achievementUsers.includes(item))
                    finalUserIds.push(item)
            })
        }
        else {
            data.educationUsers.forEach(item => {
                    finalUserIds.push(item)
            })
        }
    } if(data.hasAboutMe) {
        if(data.hasSkill && data.hasEducation && data.hasAchievement && data.hasExperience) {
            data.aboutMeUsers.forEach(item => {
                if(data.skillUsers.includes(item) && data.educationUsers.includes(item) && data.achievementUsers.includes(item) && data.experienceUsers.includes(item))
                    finalUserIds.push(item)
            })
        } else if(!data.hasSkill && data.hasEducation && data.hasAchievement && data.hasExperience) {
            data.aboutMeUsers.forEach(item => {
                if(data.educationUsers.includes(item) && data.achievementUsers.includes(item) && data.experienceUsers.includes(item))
                    finalUserIds.push(item)
            })
        } else if(!data.hasSkill && !data.hasEducation && data.hasAchievement && data.hasExperience) {
            data.aboutMeUsers.forEach(item => {
                if(data.achievementUsers.includes(item) && data.experienceUsers.includes(item))
                    finalUserIds.push(item)
            })
        } else if(!data.hasSkill && !data.hasEducation && !data.hasAchievement && data.hasExperience) {
            data.aboutMeUsers.forEach(item => {
                if(data.experienceUsers.includes(item))
                    finalUserIds.push(item)
            })
        } else if(data.hasSkill && !data.hasEducation && !data.hasAchievement && !data.hasExperience)  {
            data.aboutMeUsers.forEach(item => {
                if(data.skillUsers.includes(item))
                    finalUserIds.push(item)
            })
        } else if(!data.hasSkill && data.hasEducation && !data.hasAchievement && !data.hasExperience) {
            data.aboutMeUsers.forEach(item => {
                if(data.educationUsers.includes(item))
                    finalUserIds.push(item)
            })
        } else if(!data.hasSkill && !data.hasEducation && data.hasAchievement && !data.hasExperience) {
            data.aboutMeUsers.forEach(item => {
                if(data.achievementUsers.includes(item))
                    finalUserIds.push(item)
            })
        }
        else {
            data.aboutMeUsers.forEach(item => {
                finalUserIds.push(item)
            })
        }
    }
    return finalUserIds
}

export default async(tags: ITagsSearch, pageSize: number = 20, pageNum: number = 1, orderBy : any) => {
    try {
        const db = await connect(<string>process.env.MONGO_URL_FLLAIR, { useNewUrlParser: true, useUnifiedTopology: true })

        LoadFllairModels(db)

        const educationUsers: string[] = []
        if(tags.education.length >= 1) {
            const tagRegex: RegExp[] = []
            tags.education.forEach(tag => {
                tagRegex.push(new RegExp(tag, 'i'))
            })
            const educations = await db.model('user.education').aggregate([
                {
                    $group: {
                        _id: '$metadata.owner',
                        tags: { $addToSet: { $concat:['$institutionName']}}
                    }
                },
                {
                    $match: {
                        tags: {
                            $all: tagRegex
                        }
                    }
                }
            ])
            const educationUserIds: string[] = educations.map((x: any) => x._id.toString())
            const dataIds: string[] = [...new Set(educationUserIds)]
            educationUsers.push(...dataIds)    
        }
        
        const skillUsers: string[] = []
        if(tags.skill.length >= 1) {
            const tagRegex: RegExp[] = []
            tags.skill.forEach(tag => {
                tagRegex.push(new RegExp(tag, 'i'))
            })
            const skills = await db.model('user.skill').aggregate([
                {
                    $group: {
                        _id: '$metadata.owner',
                        tags: { $addToSet: { $concat: ['$skillName']}}
                    }
                },
                {
                    $match: {
                        tags: {
                            $all: tagRegex
                        }
                    }
                }
            ])
            const skillUserIds: string[] = skills.map((x: any) => x._id.toString())
            const dataIds : string[] = [...new Set(skillUserIds)]
            skillUsers.push(...dataIds)
        }
        
        const achievementUsers : string[] = []
        if(tags.achievement.length >= 1) {
            const tagRegex: RegExp[] = []
            tags.achievement.forEach(tag => {
                tagRegex.push(new RegExp(tag, 'i'))
            })
            const achievements = await db.model('user.achievement').aggregate([
              {
                  $group: {
                      _id: '$metadata.owner',
                      tags: { $addToSet: { $concat: ['$achievementName']}}
                  }
              },
              {
                  $match: {
                      tags: {
                          $all: tagRegex
                      }
                  }
              }
            ])
            const achievementUsersIds : string[] = achievements.map((x: any) => x._id.toString())
            const dataIds = [...new Set(achievementUsersIds)]
            achievementUsers.push(...dataIds)
        }
       
        const experienceUsers : string[] = []
        if(tags.experience.length >= 1) {
            const tagRegex: RegExp[] = []
            tags.experience.forEach(tag => {
                tagRegex.push(new RegExp(tag, 'i'))
            })
            const experiences = await db.model('user.experience').aggregate([
                {
                    $group: {
                        _id: '$metadata.owner',
                        tags: { $addToSet: { $concat: ['$jobTitle']}}
                    }
                },
                {
                    $match: {
                        tags: {
                            $all: tagRegex
                        }
                    }
                }
            ])
            const experienceUserIds : string[] = experiences.map((x: any) => x._id.toString())
            const dataIds: string[] = [...new Set(experienceUserIds)]
            experienceUsers.push(...dataIds)
        }

        const aboutMeUsers: string[] = []
        if(tags.aboutMe.length >= 1) {
            const tagRegex: RegExp[] = []
            tags.aboutMe.forEach(tag => {
                tagRegex.push(new RegExp(tag, 'i'))
            })
            const userProfiles = await db.model('user.profile').find({
                aboutMe: {
                    $all: tagRegex
                }
            })
            const aboutMeUserIds: string[] = userProfiles.map((x: any) => x.user.toString())
            const dataIds : string[] =  [...new Set(aboutMeUserIds)]
            aboutMeUsers.push(...dataIds)
        }
        let totalCount = 0
        let userIds: string[] = []
        if(tags.skill.length >= 1 || tags.aboutMe.length >= 1 || tags.education.length >= 1 || tags.experience.length >= 1 && tags.achievement.length >= 1) {
            userIds = getFinalUserId({
                hasAboutMe: tags.aboutMe.length >= 1 ? true : false,
                hasAchievement: tags.achievement.length >= 1 ? true : false,
                hasEducation: tags.education.length >= 1 ? true: false,
                hasExperience: tags.experience.length >= 1 ? true : false,
                hasSkill: tags.skill.length >= 1 ? true : false,
                aboutMeUsers: aboutMeUsers,
                achievementUsers: achievementUsers,
                educationUsers: educationUsers,
                skillUsers: skillUsers,
                experienceUsers: experienceUsers
            })
            const totalProfiles = await db.model('user.profile').find({ user: { $in: [...new Set(userIds)]}})
            totalCount = totalProfiles.length
        } else {
            const totalProfiles = await db.model('user.profile').find({ user: { $ne: null }})

            totalCount = totalProfiles.length
        }   
        let searchItems: any = []
        const offset = (pageNum - 1) * pageSize
        if(tags.skill.length >= 1 || tags.aboutMe.length >= 1 || tags.education.length >= 1 || tags.experience.length >= 1 || tags.achievement.length >= 1) {
            if(orderBy !== null) {
                searchItems = await db.model('user.profile').find({ user: { $in: [...new Set(userIds)]}})
                    .populate('user')
                    .populate('resume.education')
                    .populate('resume.experiences')
                    .populate('resume.achievements')
                    .populate('resume.skills')
                    .sort(orderBy)
                    .skip(offset)
                    .limit(pageSize)
            } else {
                searchItems = await db.model('user.profile').find({ user: { $in: [...new Set(userIds)]}})
                    .populate('user')
                    .populate('resume.education')
                    .populate('resume.experiences')
                    .populate('resume.achievements')
                    .populate('resume.skills')
                    .sort(orderBy)
                    .skip(offset)
                    .limit(pageSize)
    
                
            }
        } else {
            if(orderBy !== null) {
                searchItems = await db.model('user.profile').find({})
                    .populate('user')
                    .populate('resume.education')
                    .populate('resume.experiences')
                    .populate('resume.achievements')
                    .populate('resume.skills')
                    .sort(orderBy)
                    .skip(offset)
                    .limit(pageSize)
            } else {
                searchItems = await db.model('user.profile').find({})
                    .populate('user')
                    .populate('resume.education')
                    .populate('resume.experiences')
                    .populate('resume.achievements')
                    .populate('resume.skills')
                    .sort(orderBy)
                    .skip(offset)
                    .limit(pageSize)
    
                
            }
        }
        
        
        const list: any[] = []

        searchItems.forEach((item : any) => {
            const tags: string[] = []
            tags.push(...item.resume.education.map((x : any) => x.institutionName))
            tags.push(...item.resume.skills.map((x : any) => x.skillName))
            tags.push(...item.resume.experience.map((x : any) => x.jobTitle))
            tags.push(...item.resume.achievements.map((x : any) => x.achievementName))
            if(item.user) {
                list.push({
                    _id: item.user._id,
                    firstName: item.firstName,
                    lastName: item.lastName,
                    avatarUrl: item.displayPicture,
                    jobTitle: item.jobTitle,
                    username: item.user.userName,
                    resume: {
                        education: item.resume.education.length,
                        skills: item.resume.skills.length,
                        experience: item.resume.experience.length,
                        achievements: item.resume.achievements.length
                    },
                    premium: {
                        pro: item.premium.hasProSubscription,
                        interviewed: item.premium.hasInterview,
                        interviewDate: item.premium.interviewDate
                    },
                    tags
                })
            }
        })

        return {
            Items: list,
            TotalItems: totalCount ,
            PageNum: pageNum,
            PageSize: pageSize,
            Successful: true,
            Message: 'Successfully retrieve records.'
        }

    } catch(err) {
        console.log(err)
        throw new Error(err.message)
    }
}