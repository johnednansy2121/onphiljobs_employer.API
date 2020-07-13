import { createConnection } from 'mongoose'

export const PartnersDBConnect = async() => await createConnection(<string>process.env.MONGO_URL, { useUnifiedTopology : true, useNewUrlParser: true })