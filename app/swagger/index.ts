import YAML from 'yamljs'
import path from 'path'

const resolvePath = path.resolve(__dirname)

const UserAPI = YAML.load( resolvePath + '/paths/user.api.yaml')
const TestAPI = YAML.load( resolvePath + '/paths/test.api.yaml')
const ClientAPI = YAML.load( resolvePath + '/paths/client.api.yaml')
const ProfileAPI = YAML.load( resolvePath + '/paths/profile.api.yaml')
const TalentsAPI = YAML.load( resolvePath + '/paths/talents.api.yaml')
const JobAPI = YAML.load( resolvePath + '/paths/job.api.yaml')
const ApplicationAPI = YAML.load( resolvePath + '/paths/application.api.yaml')

const SwaggerOptions = {
    swagger: '2.0',
    info: {
        title: 'OT FLLAIR PARTNERS API',
        description: 'api documentation for fllair partners.',
        version: '1.0.0'
    },
    basePath: '/api/v1',
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    paths: {
        ...UserAPI.routes,
        ...ClientAPI.routes,
        ...TestAPI.routes,
        ...ProfileAPI.routes,
        ...TalentsAPI.routes,
        ...JobAPI.routes,
        ...ApplicationAPI.routes
    },
    securityDefinitions: {
        bearerAuth: {
            type: 'apiKey',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            name: 'Authorization',
            in: 'header'
        }
    },
    parameters: {
        filterParams: {
            in: "query",
            name: "$filter",
            description: "query filter eg. name eq 'title'",
            schema: {
                type: 'string'
            }
        },
        pageSizeParams: {
            in: "query",
            name: "$pageSize",
            description: "number of items per page",
            schema: {
                type: 'number',
                default: 20
            }
        },
        pageNumParams: {
            in: "query",
            name: "$pageNum",
            description: "page number determines the offset.",
            schema: {
                type: 'number',
                default: 1
            }
        },
        orderByParams: {
            in: "query",
            name: "$orderBy",
            description: "order query eg. dateCreated desc",
            schema: {
                type: 'string'
            }
        }
    },
    responses: {
        BADREQUEST: {
            description: 'bad request',
            schema: {
                $ref: '#/definitions/schemas/BASE_RESULT'
            }
        },
        UNAUTHORIZED: {
            description: 'unauthorized access',
            schema: {
                $ref: '#/definitions/schemas/BASE_RESULT'
            }
        }
    },
    definitions: {
        schemas: {
            ...UserAPI.models,
            ...ClientAPI.models,
            ...ProfileAPI.models,
            ...TalentsAPI.models,
            ...JobAPI.models,
            ...ApplicationAPI.models,
            BASE_RESULT: {
                properties: {
                    Message: {
                        type: 'string'
                    },
                    Successful: {
                        type: 'boolean'
                    }
                }
            },
            searchResult: {
                allOf: [
                    {
                        $ref: '#/definitions/schemas/BASE_RESULT'
                    },
                    {
                        type: 'object',
                        properties: {
                            TotalItems: {
                                type: 'number'
                            },
                            PageSize: {
                                type: 'number'
                            },
                            PageNum: {
                                type: 'number'
                            }
                        }
                    }
                ]
            }
        }
    }
}


export default SwaggerOptions