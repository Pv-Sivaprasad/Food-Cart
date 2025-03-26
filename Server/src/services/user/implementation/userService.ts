import bcrypt from 'bcryptjs';
import { IUserRepository } from '../../../repositories/user/interface/userRepository.interface';
import { IUserService } from '../interface/userService.interface';
import { IUser } from '../../../models/user/userModel';
import { hashPassword } from '../../../utils/admin/password.util';
import { AppError } from '../../../utils/appError';
import { generateAccessToken, generateRefreshToken } from '../../../utils/user/token.util';
import { SignInResult } from '../../../dto/userAuth.dto';
import cloudinary from '../../../utils/user/image.util';


export class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) {}

  async register(user: IUser): Promise<IUser> {
    try {
      console.log('in the service');
      
      const existingUser = await this.userRepository.findUserByEmail(user.email);

      if (existingUser) {
        throw new AppError('Email already exists. Please use a different email.', 409);
      }

      const hashedPassword = await hashPassword(user.password);
      user.password = hashedPassword;
      return await this.userRepository.createUser(user);

    } catch (error) {
      console.error('Error in register service:', error);
      throw error;  
    }
  }

  async login(email: string, password: string): Promise<SignInResult | string> {
    try {
      const user = await this.userRepository.findUserByEmail(email);
      if (!user) throw new AppError('Invalid email or password', 401);

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new AppError('Invalid email or password', 401);

      const accessToken = generateAccessToken({ id: user.id });
      const refreshToken = generateRefreshToken({ id: user.id });

      let data={
        accessToken,refreshToken
      }
      return data;

    } catch (error) {
      console.error('Error in login service:', error);
      throw error;  
    }
  }

  async editProfile(userId: string, updates: Partial<IUser>, file?: Express.Multer.File): Promise<IUser> {
    try {
      console.log('Edit profile service called');
      if (file) {
        const uploadResponse = await cloudinary.uploader.upload(file.path, {
          folder: 'profile_pictures',
        });
        updates.profileImage = uploadResponse.secure_url;
      }

      const allowedUpdates: Partial<IUser> = {};
      if (updates.userName) allowedUpdates.userName = updates.userName;
      if (updates.dob) allowedUpdates.dob = updates.dob;
      if (updates.mobile) allowedUpdates.mobile = updates.mobile;
      if (updates.profileImage) allowedUpdates.profileImage = updates.profileImage;

     
      delete updates.email;
      delete updates.password;

    
      const updatedUser = await this.userRepository.updateUser(userId, allowedUpdates);
      if (!updatedUser) throw new AppError('User not found', 404);

      return updatedUser;
    } catch (error) {
      console.error('Error in edit profile service:', error);
      throw error;
    }
  }

  
}
