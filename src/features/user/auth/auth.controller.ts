import { Request, Response } from 'express'
import AuthService, { SigninProps, SignupProps } from './auth.service';

const AuthController = {
    signinUser: async (req: Request & { body: SigninProps } , res: Response) => {
        const response = await AuthService.signinUser(req.body)
        res.json(response);
    },
    
    signupUser: async (req: Request & { body: SignupProps }, res: Response) => {
        const response = await AuthService.signupUser(req.body)
        res.json(response);
    }
}

export default AuthController;