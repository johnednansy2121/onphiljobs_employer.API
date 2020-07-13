import Joi from "@hapi/joi";


export const NewClientRequest = Joi.object({
    name: Joi.string().required()
})