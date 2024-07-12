import { Router } from "express";
import ProfileController from "./profile.controller";

const profileRouter = Router();

profileRouter.get('/', ProfileController.getUser)
profileRouter.put('/', ProfileController.updateUser)

export default profileRouter;