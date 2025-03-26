import { IUser,UserModel } from '../../../models/user/userModel';
import { BaseRepository } from '../../baseRepository';
import { IUserRepository } from '../interface/userRepository.interface';

export class UserRepository extends BaseRepository<IUser> implements IUserRepository {
  constructor() {
    super(UserModel);
  }

  async createUser(user: IUser): Promise<IUser> {
    console.log('in the repos');
    
    return await this.create(user);
  }

  async findUserByEmail(email: string): Promise<IUser | null> {
    return await UserModel.findOne({ email }); 
  
  }

  async updateUser(userId: string, updates: Partial<IUser>): Promise<IUser | null> {
 
    const updatedUser = await UserModel.findByIdAndUpdate(userId, updates, { new: true, select: 'id username email dob mobile profileImage' });
    return updatedUser; 
  }
}
