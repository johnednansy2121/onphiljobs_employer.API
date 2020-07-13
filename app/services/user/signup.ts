// import UserModel from '../../models/user'
// import { genSalt, hash } from 'bcryptjs'
// import { IUserSignUp } from '../../schema/IUser'

// const generateEncryptedPassword = async(password: string) : Promise<string> => {
//     try {
//         const salt = await genSalt(10)

//         const encryptedPassword = await hash(password, salt)

//         return encryptedPassword

//     } catch(err) {
//         throw new Error(err.message)
//     }
// }

// export default async({ email, password, confirmPassword } : IUserSignUp) : Promise<boolean> => {
//     try {

//         if(password !== confirmPassword) throw new Error('Confirm password and password doesnt match.')

//         const existingUserWithSameEmailRes = await UserModel.find({ email })

//         if(existingUserWithSameEmailRes.length >= 1) throw new Error('Email already existed.')

//         const encryptedPassword = await generateEncryptedPassword(password)

//         await UserModel.create({
//             email,
//             password: encryptedPassword,
//             metadata: {
//                 dateCreated: new Date()
//             }
//         })

//         return true


//     } catch(err) {
//         throw new Error(err.message)
//     }
// }
