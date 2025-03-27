import { IAdminService } from '../interface/adminService.interface';
import { IAdminRepository } from '../../../repositories/admin/interface/adminRepository.interface';


export class AdminService implements IAdminService {
 
    constructor(private adminRepository: IAdminRepository) {}


  async getAllUsers() {
    return this.adminRepository.getAllUsers();
  }

  async addCategory(categoryName: string) {
    return this.adminRepository.addCategory(categoryName);
  }

  async addFoodType(categoryId: string, foodName: string) {
    return this.adminRepository.addFoodType(categoryId, foodName);
  }

  async editFoodType(id: string, foodName: string) {
    return this.adminRepository.editFoodType(id, foodName);
  }

  async assignAdmin(userId: string) {
    return this.adminRepository.assignAdmin(userId);
  }
}
