import { Router } from "express";
import { AdminRole } from "../../../shared/middleware/roles/admin.role";
import AdminLeaderboardController from "./leaderboard.controller";

const adminLeaderboardRouter = Router();

adminLeaderboardRouter.post('/', AdminRole, AdminLeaderboardController.rewardUsers);

adminLeaderboardRouter.post('/', AdminRole, AdminLeaderboardController.rewardUsers);

adminLeaderboardRouter.delete('/', AdminRole, AdminLeaderboardController.viewLeaderboard);

adminLeaderboardRouter.delete('/', AdminRole, AdminLeaderboardController.clearLeaderboard);

export default adminLeaderboardRouter;