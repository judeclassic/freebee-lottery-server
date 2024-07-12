import { AdminModel, IAdmin } from "../../../shared/data/models/admin";
import EncryptionRepository, { Token } from "../../../shared/data/repositories/encryption";
import { IResponse } from "../../../shared/utils/types";

export type SigninProps = {
    email_address: string;
    password: string;
}

export type SignupProps = {
    name: string;
    email_address: string;
    password: string;
}

const AdminAuthService = {
    signinAdmin: async ({ email_address, password }: SigninProps): IResponse<IAdmin & { token: string }> => {
        try {
            const admin = await AdminModel.findOne({ email_address });
            if (!admin) {
                return { status: false, message: 'email is not registered with us' };
            }

            return { status: true, data: {
                ...admin,
                token: EncryptionRepository.encryptToken({ id: admin._id }, Token.adminAccessToken)}
            }
        } catch (err) {
            return { status: false, message: err as string };
        }

    },
    signupAdmin: async ({ name, email_address, password } : SignupProps): IResponse<IAdmin & {token: string}> => {
        try {
            const isAdminExisting = await AdminModel.findOne({ email_address });
            if (isAdminExisting) {
                return {
                    status: false,
                    message: 'email already exist',
                    error: [{ field: 'email_address', message: 'email already exist' }]
                };
            }
            password = EncryptionRepository.encryptPassword(password);

            const admin = await AdminModel.create({ name, email_address, password });
            if (!admin) {
                return { status: false, message: 'unable to register this user' };
            }

            return { status: true, data: {
                ...admin,
                token: EncryptionRepository.encryptToken(admin._id, Token.adminAccessToken)}
            }
        } catch (err) {
            return { status: false, message: err as string };
        }
    }
}

export default AdminAuthService;