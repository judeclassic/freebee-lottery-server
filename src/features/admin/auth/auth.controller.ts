import { Request, Response } from 'express'
import AuthService, { SigninProps, SignupProps } from './auth.service';

const AuthController = {
    signinAdmin: async (req: Request & { body: SigninProps } , res: Response) => {
        const response = await AuthService.signinAdmin(req.body)
        res.json(response);
    },
    
    signupAdmin: async (req: Request & { body: SignupProps }, res: Response) => {
        const response = await AuthService.signupAdmin(req.body)
        res.json(response);
    }
}

export default AuthController;