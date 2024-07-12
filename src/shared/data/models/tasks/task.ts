import { Schema, model, PaginateModel } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

export type ITask = {
    _id: Schema.Types.ObjectId,
    name: string;
    description: string;
    expire_at: Date;
    created_at: Date;
    updated_at: Date;
};

const TaskSchema = new Schema<ITask>({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    expire_at: {
        type: Date,
        default: new Date(),
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    updated_at: {
        type: Date,
        default: new Date()
    }
});

mongoosePaginate(TaskSchema);

export const TaskModel = model<ITask, PaginateModel<ITask>>("user", TaskSchema);

export type IPaginatedTask = {
    total_tasks: number;
    tasks: ITask[];
    has_next: boolean;
}