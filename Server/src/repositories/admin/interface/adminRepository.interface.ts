export interface IAdminRepository {
    findAdminByEmail(email: string): Promise<{ id: string; email: string; password: string } | null>;
    getAllUsers(): Promise<any>;
    addCategory(categoryName: string): Promise<any>;
    addFoodType(categoryId: string, foodName: string): Promise<any>;
    editFoodType(id: string, foodName: string): Promise<any>;
    assignAdmin(userId: string): Promise<any>;
  }