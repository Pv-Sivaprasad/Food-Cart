import { IUser } from "../../../models/user/userModel";

export interface IUserRepository {
  createUser(user: IUser): Promise<IUser>;
  findUserByEmail(email: string): Promise<IUser | null>;
  updateUser(userId: string, updates: Partial<IUser>): Promise<IUser | null>;
}
