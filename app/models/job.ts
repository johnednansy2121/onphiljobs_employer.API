import { Document, Schema } from 'mongoose'

export interface IJob extends Document {
    title: string
    subtitle: string
    section: IJobSection[]
    details: {
        isWorkFromHome: boolean
        location: {
            address1: string
            address2: string
            city: string
            state: string
            postalCode: string
            country: string
            lat: number
            long: number
        }
        salary: {
            base: number
            upper: number
            currency: string
            type: string
        }
        commitment: {
            type: string
            duration: {
                quantity: number,
                unit: string
            }  
        }
        category: string
    }
    geoLocation: {
        type: string,
        coordinates: number[]
    }
    status: string
    premium: {
        isFeatured: boolean
    }
    private: {
        notes: string[]
    }
    metadata: {
        createdBy: string
        organization: string
        client: string
        dateCreated: Date
        dateUpdated: Date
        publishDate: Date
    }
}

export interface IJobSection {
    title: string
    description: string
}

export interface IJobCreateRequest {
    title: string
    subtitle: string
    section: IJobSection[]
    details: {
        isWorkFromHome: boolean
        location: {
            address1: string
            address2: string
            city: string
            state: string
            postalCode: string
            country: string
            lat: number
            long: number
        }
        salary: {
            base: number
            upper: number
            currency: string
            type: string
        }
        commitment: {
            type: string
            duration: {
                quantity: number
                unit: string
            }
        }
        category: string
    }
    status: string
    premium: {
        isFeatured: boolean
    }
    client: string
}

export interface IJobEditRequest {
    _id: string
    title: string
    subtitle: string
    section: IJobSection[]
    details: {
        isWorkFromHome: boolean
        location: {
            address1: string
            address2: string
            city: string
            state: string
            postalCode: string
            country: string
            lat: number
            long: number
        }
        salary: {
            base: number
            upper: number
            currency: string
            type: string
        }
        commitment: {
            type: string
            duration: {
                quantity: number
                unit: string
            }
        }
        category: string
    }
    status: string
    premium: {
        isFeatured: boolean
    }
    client: string
}

export interface IJobListItem {
    _id: string
    title: string
    subtitle: string
    status: string
    metadata: {
        dateCreated: Date
        dateUpdated: Date
    }
}

export const JobSchema : Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    section: [
        {
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            }
        }
    ],
    geoLocation: {
        type: {
            type: String,
            default: 'Point'
        },
        coordinates: {
            type: [Number]
        }
    },
    details: {
        isWorkFromHome: {
            type: Boolean
        },
        location: {
            address1: {
                type: String
            },
            address2: {
                type: String
            },
            city: {
               type: String
            },
            state: {
                type: String
            },
            postalCode: {
                type: String
            },
            country: {
                type: String
            },
            lat: {
                type: Number
            },
            long: {
                type: Number
            },
        },
        salary: {
            base: {
                type: Number,
                default: 0
            },
            upper: {
                type: Number,
                default: 0
            },
            currency: {
                type: String,
                default: 'AUD'
            },
            type: {
                type: String,
                default: 'Hourly'
            }
        },
        commitment: {
            type: {
                type: String,
                default: 'full-time'
            },
            duration: {
                quantity: {
                    type: Number,
                    required: true,
                    default: 3
                },
                unit: {
                    type: String,
                    required: true,
                    default: 'days'
                }
            }
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'category'
        }
    },
    status: {
        type: String,
        default: 'DRAFT'
    },
    premium: {
        isFeatured: {
            type: Boolean,
            default: false
        }
    },
    private: {
        notes: [
            {
                type: Schema.Types.ObjectId
            }
        ]
    },
    metadata: {
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        organization: {
            type: Schema.Types.ObjectId,
            ref: 'organization'
        },
        client: {
            type: Schema.Types.ObjectId,
            ref: 'client'
        },
        dateCreated: {
            type: Date,
        },
        dateUpdated: {
            type: Date
        },
        publishDate: {
            type: Date
        }
    }
})