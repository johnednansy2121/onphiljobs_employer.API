import Joi from "@hapi/joi";

const SectionCreateRequest = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required()
})

export const JobCreateRequest = Joi.object({
    title: Joi.string().required(),
    subtitle: Joi.string().required(),
    section: Joi.array().items(SectionCreateRequest).min(1),
    details: Joi.object().keys({
        isWorkFromHome: Joi.bool().default(false),
        location: Joi.object().optional().keys({
            address1: Joi.string().required(),
            address2: Joi.string().allow('', null),
            city: Joi.string().required(),
            state: Joi.string().required(),
            postalCode: Joi.string().required(),
            country: Joi.string().required(),
            lat: Joi.number().required(),
            long: Joi.number().required()
        }),
        salary: Joi.object().optional().keys({
            base: Joi.number().allow('', null).default(0),
            upper: Joi.number().allow('', null).default(0),
            currency: Joi.string().allow('', null).default('AUD'),
            type: Joi.string().allow('', null).default('Hourly')
        }),
        commitment: Joi.object().keys({
            type: Joi.string().valid('full-time', 'part-time', 'casual', '', null),
            duration: Joi.object().optional().keys({
                quantity: Joi.number().required().default(0),
                unit: Joi.string().required().valid('days', 'weeks', 'years', 'months')
            })
        }),
        category: Joi.string().allow('', null)
    }),
    status: Joi.string().valid('DRAFT', 'UNLISTED', 'PUBLISHED').required(),
    premium: Joi.object().keys({
        isFeatured: Joi.bool().default(false)
    }),
    client: Joi.string().allow('', null)
})


export const JobEditRequest = Joi.object({
    _id: Joi.string().required(),
    title: Joi.string().required(),
    subtitle: Joi.string().required(),
    section: Joi.array().items(SectionCreateRequest).min(1),
    details: Joi.object().keys({
        isWorkFromHome: Joi.bool().default(false),
        location: Joi.object().optional().keys({
            address1: Joi.string().required(),
            address2: Joi.string().allow('', null),
            city: Joi.string().required(),
            state: Joi.string().required(),
            postalCode: Joi.string().required(),
            country: Joi.string().required(),
            lat: Joi.number().required(),
            long: Joi.number().required()
        }),
        salary: Joi.object().optional().keys({
            base: Joi.number().allow('', null).default(0),
            upper: Joi.number().allow('', null).default(0),
            currency: Joi.string().allow('', null).default('AUD'),
            type: Joi.string().allow('', null).default('Hourly')
        }),
        commitment: Joi.object().keys({
            type: Joi.string().valid('full-time', 'part-time', 'casual', '', null),
            duration: Joi.object().optional().keys({
                quantity: Joi.number().required().default(0),
                unit: Joi.string().required().valid('days', 'weeks', 'years', 'months')
            })
        }),
        category: Joi.string().allow('', null)
    }),
    status: Joi.string().valid('DRAFT', 'UNLISTED', 'PUBLISHED').required(),
    premium: Joi.object().keys({
        isFeatured: Joi.bool().default(false)
    }),
    client: Joi.string().allow('', null)
})

export const IJobInviteSchema = Joi.object({
    jobId: Joi.string().required(),
    applicantId: Joi.string().required()
})