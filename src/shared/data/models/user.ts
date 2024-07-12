import { Schema, model, PaginateModel } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

export type IWallet = {
    balance: number;
}

export type IUser = {
    _id: Schema.Types.ObjectId,
    name: string;
    email_address: string;
    is_banned: boolean;
    password: string;
    created_at: Date;
    updated_at: Date;
    wallet: IWallet;
};

const WalletSchema = new Schema<IWallet>({
    balance: {
        type: Number,
        default: 0,
    },
})

const UserSchema = new Schema<IUser>({
    name: {
        type: String,
    },
    email_address: {
        type: String,
    },
    password: {
        type: String,
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    },
    is_banned: {
        type: Boolean,
        default: false
    },
    wallet: WalletSchema,
});

mongoosePaginate(UserSchema);

export const UserModel = model<IUser, PaginateModel<IUser>>("user", UserSchema);

export type IPaginatedUser = {
    total_users: number;
    users: IUser[];
    has_next: boolean;
}