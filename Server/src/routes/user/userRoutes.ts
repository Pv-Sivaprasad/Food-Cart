import express from 'express'
import authenticateToken from '../../middleware/authenticateToken'
import { userController } from '../../config/container'
import multer from 'multer'



const user_route=express.Router()
const upload=multer({dest:'src/upload/'})

user_route.post('/signup',userController.register.bind(userController))
user_route.post('/signin',userController.login.bind(userController))
user_route.patch('/profile-edit',authenticateToken,upload.single('profileImage'),userController.editProfile.bind(userController))


export default user_route