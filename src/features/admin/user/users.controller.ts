import { Request, Response } from 'express'
import { IPaginateOptions } from '../../../shared/utils/types';
import AuthService, { UserProps } from './users.service';

const AdminUsersController = {
    getAllUsers: async (req: Request & { query: IPaginateOptions } , res: Response) => {
        const response = await AuthService.getAllUsers(req.body)
        res.json(response);
    },
    
    banUser: async (req: Request & { body: UserProps }, res: Response) => {
        const response = await AuthService.banUser(req.body)
        res.json(response);
    },

    unbanUser: async (req: Request & { body: UserProps }, res: Response) => {
        const response = await AuthService.unbanUser(req.body)
        res.json(response);
    }
}

export default AdminUsersController;