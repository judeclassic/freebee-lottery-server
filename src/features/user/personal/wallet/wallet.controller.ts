import { Request, Response } from 'express'
import WalletService from './wallet.service';

const WalletController = {
    deposit: async (req: Request, res: Response) => {
        const response = await WalletService.deposit()
        res.json(response);
    },
    
    withdraw: async (req: Request, res: Response) => {
        const response = await WalletService.withdraw()
        res.json(response);
    }
}

export default WalletController;