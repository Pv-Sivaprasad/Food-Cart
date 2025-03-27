export interface IAdminService {
   
    getAllUsers(): Promise<any>;
    addCategory(categoryName: string): Promise<any>;
    addFoodType(categoryId: string, foodName: string): Promise<any>;
    editFoodType(id: string, foodName: string): Promise<any>;
    assignAdmin(userId: string): Promise<any>;
  }
  