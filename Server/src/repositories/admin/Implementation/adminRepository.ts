import { IAdminRepository } from "../interface/adminRepository.interface";
import { IUser,UserModel } from "../../../models/user/userModel";


export class AdminRepository implements IAdminRepository {

    
  async findAdminByEmail(email: string) {
    // Fetch admin by email from the database
    return { id: '1', email, password: 'hashedPassword' };
  }

  async getAllUsers() {
    
  }

  async addCategory(categoryName: string) {
    return { success: true, message: 'Category added' };
  }

  async addFoodType(categoryId: string, foodName: string) {
    return { success: true, message: 'Food type added' };
  }

  async editFoodType(id: string, foodName: string) {
    return { success: true, message: 'Food type updated' };
  }

  async assignAdmin(userId: string) {
    return { success: true, message: 'User assigned as admin' };
  }
}