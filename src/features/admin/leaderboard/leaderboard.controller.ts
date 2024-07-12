import { Request, Response } from 'express'
import { IPaginateOptions } from '../../../shared/utils/types';
import AdminLeaderboardService, { LeaderRewardProps, RemoveUserProps } from './leaderboard.service';

const AdminLeaderboardController = {
    rewardUsers: async (req: Request & { body: LeaderRewardProps } , res: Response) => {
        const response = await AdminLeaderboardService.rewardUsers(req.body)
        res.json(response);
    },

    removeUser: async (req: Request & { body: RemoveUserProps } , res: Response) => {
        const response = await AdminLeaderboardService.removeUserFromBoard(req.body)
        res.json(response);
    },
    
    clearLeaderboard: async (req: Request, res: Response) => {
        const response = await AdminLeaderboardService.clearLeaderboard();
        res.json(response);
    },

    viewLeaderboard: async (req: Request & { query: IPaginateOptions }, res: Response) => {
        const response = await AdminLeaderboardService.viewAllRankings(req.body);
        res.json(response);
    },
}

export default AdminLeaderboardController;