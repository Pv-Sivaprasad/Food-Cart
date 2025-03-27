import { UserModel } from '../../models/user/userModel'


 export  class AdminAuthRepository{

  
    async findUserByEmail(email:string){
        return await UserModel.findOne({email})
    }



    
}