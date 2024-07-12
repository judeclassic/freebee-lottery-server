import { Router } from "express";
import profileRouter from "./profile/profile.routes";
import walletRouter from "./wallet/wallet.routes";

const personalRouter = Router();

personalRouter.use('/profile', profileRouter)
personalRouter.use('/wallet', walletRouter)

export default personalRouter;