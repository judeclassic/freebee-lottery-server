import { Request, Response } from 'express'
import ProfileService from './profile.service';

const ProfileController = {
    getUser: async (req: Request, res: Response) => {
        const response = await ProfileService.getUser()
        res.json(response);
    },
    
    updateUser: async (req: Request, res: Response) => {
        const response = await ProfileService.updateUser()
        res.json(response);
    }
}

export default ProfileController;