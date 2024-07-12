import { Router } from "express";
import WalletController from "./wallet.controller";

const walletRouter = Router();

walletRouter.post('/withdraw', WalletController.withdraw)
walletRouter.post('/deposit', WalletController.deposit)

export default walletRouter;