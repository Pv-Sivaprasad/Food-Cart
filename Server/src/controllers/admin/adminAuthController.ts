import { Request,Response } from "express";
import { HttpStatus } from "../../enums/httpStatus";
import { adminSignInSchema } from "../../utils/admin/validation.util";

import { AuthService } from "../../services/admin/implementation/authService";
import { AppError } from "../../utils/appError";

const authService=new AuthService()


export class AdminAuthController{


    async login(req:Request,res:Response){

console.log('reached here');

        try {
            const validationResult=adminSignInSchema.safeParse(req.body)
            if(!validationResult){
                res.status(HttpStatus.BAD_REQUEST)
                .json({success:false,message:"invalid Credentials"})
            }

            const response=await authService.docSignIn(req.body)
            return res.status(HttpStatus.OK).json(response)
            
                
        } catch (error) {

            if (error instanceof AppError) {
                return res.status(error.statusCode).json({ success: false, message: error.message });
              }
              res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
        }

    }

}


