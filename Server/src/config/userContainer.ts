import { UserController } from "../controllers/user/userController";
import { UserRepository } from "../repositories/user/implementation/userRepository";
import { UserService } from "../services/user/implementation/userService";


const userRepostioty=new UserRepository()
const userService=new UserService(userRepostioty)
const userController= new UserController(userService)


export {userController}