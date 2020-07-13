import Joi from '@hapi/joi'

export const UserLogin = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6)
})