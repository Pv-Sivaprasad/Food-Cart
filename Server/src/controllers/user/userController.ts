import { Request, Response } from 'express';
// import { IUserService } from '../../../services/user/interface/userService.interface';
import { IUserService } from '../../services/user/interface/userService.interface';
import { userSignInSchema, userSignUpSchema } from '../../utils/user/validation.util';
import { HttpStatus } from '../../enums/httpStatus';
import { AppError } from '../../utils/appError';
import { CustomeRequest } from '../../middleware/authenticateToken';
import { JwtPayload } from 'jsonwebtoken';


export class UserController {

  constructor(private userService: IUserService) { }

  async register(req: Request, res: Response) {
    console.log('in the contoller');

    try {

      const validationResult = userSignUpSchema.safeParse(req.body)
      console.log(validationResult, "validationResult");

      if (!validationResult.success) {
        return res.status(HttpStatus.BAD_REQUEST)
          .json({ success: false, message: validationResult.error.errors[0].message })

      }

      const user = await this.userService.register(req.body);
      console.log('user', user);

      return res.status(HttpStatus.OK).json(user)

    } catch (error) {
      console.log('error in signup ', error);
      if (error instanceof AppError) {

        return res.status(error.statusCode).json({ success: false, message: error.message });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      console.log(req.body, 'req.body');

      const validationResult = userSignInSchema.safeParse(req.body)
      if (validationResult) {
        const data = await this.userService.login(email, password);
        console.log(data, 'incont');

        console.log(typeof data, 'incont');
        if (typeof data === 'string') {
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: data })
          return
        } else {

          res.status(HttpStatus.OK).cookie('rfr_usr_tkn', data.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000
          }).json(data.accessToken)
        }

        res.status(HttpStatus.CREATED).json(data)

      } else {
        res.status(HttpStatus.BAD_REQUEST).json(validationResult)
      }
    } catch (error) {

      console.error('Login error:', error);


      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ success: false, message: error.message });
      }


      
      return res.status(500).json({ success: false, message: 'Something went wrong' });
    }
  }


  async editProfile(req: CustomeRequest, res: Response) {

    try {
      const user = req.user as JwtPayload
      const userId = user.id
      const updates = req.body
      const file = req.file
      const data = await this.userService.editProfile(userId, updates, file)

      res.status(HttpStatus.CREATED).json({ success: true, user: data })

    } catch (error) {
      console.error('Error in edit profile controller:', error);
      const statusCode = error instanceof AppError ? error.statusCode : 500;
      res.status(statusCode).json({ success: false, message: error });
    }
  }


}

