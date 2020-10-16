import { createConnection } from 'mongoose'

export const PartnersDBConnect = async() => await createConnection(<string>process.env.MONGODB_URL_PARTNERS, { useUnifiedTopology : true, useNewUrlParser: true })