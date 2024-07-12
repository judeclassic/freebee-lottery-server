import { Router } from "express";
import { AdminRole } from "../../../shared/middleware/roles/admin.role";
import AdminUsersController from "./tasks.controller";

const userRouter = Router();

userRouter.post('/', AdminRole, AdminUsersController.startTask);
userRouter.delete('/', AdminRole, AdminUsersController.completeTasks);

userRouter.get('/', AdminRole, AdminUsersController.viewAllTasks);
userRouter.get('/:id', AdminRole, AdminUsersController.viewSingleTasks);

export default userRouter;