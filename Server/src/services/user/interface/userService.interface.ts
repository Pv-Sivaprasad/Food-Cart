import { SignInResult } from "../../../dto/userAuth.dto";
import { IUser } from "../../../models/user/userModel";



export interface IUserService {
  register(user: IUser): Promise<IUser>;
  login(email: string, password: string): Promise<SignInResult |string>; 
  editProfile(userId: string, updates: Partial<IUser>, file?: Express.Multer.File): Promise<IUser>;
}
