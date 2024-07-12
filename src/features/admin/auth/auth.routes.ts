import { Router } from "express";
import AuthController from "./auth.controller";

const adminAuthRouter = Router();

adminAuthRouter.post('/signin', AuthController.signinAdmin);
adminAuthRouter.post('/signup', AuthController.signupAdmin);


export default adminAuthRouter; 