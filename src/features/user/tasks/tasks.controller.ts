import { Request, Response } from 'express'
import { IPaginateOptions } from '../../../shared/utils/types';
import AdminTasksService, { TaskProps } from './users.service';

const AdminUsersController = {
    startTask: async (req: Request & { body: IPaginateOptions } , res: Response) => {
        const response = await AdminTasksService.createTask(req.body)
        res.json(response);
    },
    
    completeTasks: async (req: Request & { body: TaskProps }, res: Response) => {
        const response = await AdminTasksService.removeTasks(req.body)
        res.json(response);
    },

    viewAllTasks: async (req: Request & { query: IPaginateOptions }, res: Response) => {
        const response = await AdminTasksService.viewAllTasks(req.body);
        res.json(response);
    },

    viewSingleTasks: async (req: Request & { params: TaskProps }, res: Response) => {
        const response = await AdminTasksService.viewSingleTasks(req.params);
        res.json(response);
    }
}

export default AdminUsersController;