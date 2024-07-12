import { Router } from "express";
import { AdminRole } from "../../../shared/middleware/roles/admin.role";
import AdminUsersController from "./tasks.controller";

const adminTaskRouter = Router();

adminTaskRouter.post('/', AdminRole, AdminUsersController.createTask);
adminTaskRouter.get('/', AdminRole, AdminUsersController.viewAllTasks);
adminTaskRouter.get('/:id', AdminRole, AdminUsersController.viewSingleTasks);
adminTaskRouter.delete('/', AdminRole, AdminUsersController.removeTasks);

export default adminTaskRouter;