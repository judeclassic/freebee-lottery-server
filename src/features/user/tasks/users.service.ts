import { IPaginatedTask, ITask, TaskModel } from "../../../shared/data/models/tasks/task";
import { IPaginateOptions, IResponse } from "../../../shared/utils/types";

export type CreateTaskProps = {
    name: string;
    description: string;
    expire_at: Date;
}

export type TaskProps = {
    id: string;
}

const AdminTasksService = {
    createTask: async (props: CreateTaskProps): IResponse<ITask> => {
        try {
            const task = await TaskModel.create(props);
            if (!task) {
                return { status: false, message: 'unable to create this task' };
            }

            return { status: true, data: task };
        } catch (err) {
            return { status: false, message: err as string };
        }
    },

    removeTasks: async ({ id }: TaskProps): IResponse<ITask> => {
        try {
            const task = await TaskModel.findByIdAndDelete(id);
            if (!task) {
                return { status: false, message: 'unable to remove this task' };
            }

            return { status: true, data: task }
        } catch (err) {
            return { status: false, message: err as string };
        }
    },

    viewAllTasks: async ({ limit, page }: IPaginateOptions): IResponse<IPaginatedTask> => {
        try {
            const task = await TaskModel.paginate({}, { limit, page });
            if (!task) {
                return { status: false, message: 'unable to get all this tasks' };
            }

            return { status: true, data: {
                total_tasks: task.totalDocs,
                tasks: task.docs,
                has_next: task.hasNextPage,
            } }
        } catch (err) {
            return { status: false, message: err as string };
        }
    },
    
    viewSingleTasks: async ({ id }: TaskProps): IResponse<ITask> => {
        try {
            const user = await TaskModel.findById(id);
            if (!user) {
                return { status: false, message: 'unable to get this task' };
            }

            return { status: true, data: user }
        } catch (err) {
            return { status: false, message: err as string };
        }
    }
}

export default AdminTasksService;