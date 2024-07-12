import { Schema, model, PaginateModel } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

export type IAdmin = {
    _id: Schema.Types.ObjectId,
    name: string;
    username: string;
    profile_image: string;
    password: string;
};

const AdminSchema = new Schema({
    name: {
        type: String,
    },
    email_address: {
        type: String,
    },
    password: {
        type: String,
    },
});

mongoosePaginate(AdminSchema);

export const AdminModel = model<IAdmin, PaginateModel<IAdmin>>("admin", AdminSchema);
