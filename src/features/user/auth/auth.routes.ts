import { Router } from "express";
import AuthController from "./auth.controller";

const authRouter = Router();

authRouter.post('/signin', AuthController.signinUser);
authRouter.post('/signup', AuthController.signupUser);


export default authRouter;