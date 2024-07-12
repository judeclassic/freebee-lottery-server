import { Router } from "express";
import authRouter from "./auth/auth.routes";
import personalRouter from "./personal/personal.routes";

const userRouter = Router();

userRouter.use('/auth', authRouter);
userRouter.use('/personal', personalRouter);


export default userRouter; 