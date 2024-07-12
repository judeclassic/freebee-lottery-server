import { Router } from "express";
import { AdminRole } from "../../../shared/middleware/roles/admin.role";
import AdminUsersController from "./users.controller";

const adminUserRouter = Router();

adminUserRouter.get('/', AdminRole, AdminUsersController.getAllUsers);
adminUserRouter.post('/ban', AdminRole, AdminUsersController.banUser);
adminUserRouter.post('/unban', AdminRole, AdminUsersController.unbanUser);

export default adminUserRouter;