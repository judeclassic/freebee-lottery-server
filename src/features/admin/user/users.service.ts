import { IPaginatedUser, IUser, UserModel } from "../../../shared/data/models/user";
import { IPaginateOptions, IResponse } from "../../../shared/utils/types";

export type UserProps = {
    id: string;
}

const AdminUsersService = {
    getAllUsers: async ({ limit, page }: IPaginateOptions): IResponse<IPaginatedUser> => {
        try {
            const user = await UserModel.paginate({}, { limit, page });
            if (!user) {
                return { status: false, message: 'email is not registered with us' };
            }

            return { status: true, data: {
                total_users: user.totalDocs,
                users: user.docs,
                has_next: user.hasNextPage,
            } }
        } catch (err) {
            return { status: false, message: err as string };
        }
    },

    banUser: async ({ id }: UserProps): IResponse<IUser> => {
        try {
            const user = await UserModel.findByIdAndUpdate(id, { is_banned: true });
            if (!user) {
                return { status: false, message: 'email is not registered with us' };
            }

            return { status: true, data: user }
        } catch (err) {
            return { status: false, message: err as string };
        }
    },
    
    unbanUser: async ({ id }: UserProps): IResponse<IUser> => {
        try {
            const user = await UserModel.findByIdAndUpdate(id, { is_banned: false });
            if (!user) {
                return { status: false, message: 'email is not registered with us' };
            }

            return { status: true, data: user }
        } catch (err) {
            return { status: false, message: err as string };
        }
    }
}

export default AdminUsersService;