import { Router } from "express";
import adminAuthRouter from "./auth/auth.routes";
import adminLeaderboardRouter from "./leaderboard/leaderboard.routes";
import adminTaskRouter from "./tasks/tasks.routes";
import adminUserRouter from "./user/users.routes";

const adminRouter = Router();

adminRouter.use('/auth', adminAuthRouter);
adminRouter.use('/leaderboard', adminLeaderboardRouter);
adminRouter.use('/task', adminTaskRouter);
adminRouter.use('/user', adminUserRouter);


export default adminRouter; 