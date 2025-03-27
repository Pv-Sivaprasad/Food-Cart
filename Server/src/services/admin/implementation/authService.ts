import { signInDto } from "../../../dto/adminAuth.dto";
import { HttpStatus } from "../../../enums/httpStatus";
import { AdminAuthRepository } from "../../../repositories/admin/authRepository";
import { comparePassword } from "../../../utils/admin/password.util";
import { AppError } from "../../../utils/appError";

import { generateAccessToken, generateRefreshToken } from "../../../utils/user/token.util";


export class AuthService{

    private authRepository: AdminAuthRepository
    
    constructor(){
        this.authRepository= new AdminAuthRepository()
    }

    async docSignIn(signInDto: signInDto) {
        const { email, password } = signInDto;
        
        try {
            
            const isAdmin = await this.authRepository.findUserByEmail(email);
            
          
            if (!isAdmin) {
                throw new AppError('Invalid Email or Password.', HttpStatus.UNAUTHORIZED);
            }
            
           
            const isValidPassword = await comparePassword(password, isAdmin.password);
            
            if (!isValidPassword) {
                throw new AppError('Invalid Email or Password.', HttpStatus.UNAUTHORIZED);
            }
            
         
            const accessToken = generateAccessToken({ id: isAdmin.id });
            const refreshToken = generateRefreshToken({ id: isAdmin.id });
            
            return {
                accessToken,
                refreshToken,
                isAdmin
            };
        } catch (error) {
            console.error('Error in docSignIn service:', error);
            
          
            if (error instanceof AppError) {
                throw error;
            }
            
           
            throw new AppError('Authentication failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    // async docSignIn(signInDto:signInDto){
    //    const {email,password}=signInDto

    //    try {
    //     const isAdmin=await this.authRepository.findUserByEmail(email)
       
    //     if(!isAdmin){

    //          throw new AppError('Invalid Email or Password.', HttpStatus.CONFLICT);
    //     }

    //     const isValidPassword=await comparePassword(password,password)
    //     if (!isValidPassword) {
    //         throw new AppError('Invalid Email or Password.', HttpStatus.CONFLICT);
    //     }

    //     const accessToken=generateAccessToken({id:isAdmin.id})
    //     const refreshToken=generateRefreshToken({id:isAdmin.id})


    //     return {   accessToken,refreshToken,isAdmin    }

    //    } catch (error) {
         
        
    //     console.log('error in the service',error);
    //     throw error;  
        
    //    }
    // }
}