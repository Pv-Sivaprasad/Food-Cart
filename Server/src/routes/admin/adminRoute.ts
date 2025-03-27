import express,{ Request,Response } from "express";
import { AdminAuthController } from "../../controllers/admin/adminAuthController";

const admin_Route=express.Router()
const adminAuthController= new AdminAuthController()

admin_Route.post('/signin',adminAuthController.login)
admin_Route.get('/users',)



export default admin_Route