import { IUser, UserModel } from "../../../shared/data/models/user";
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

const AuthService = {
    signinUser: async ({ email_address, password }: SigninProps): IResponse<IUser & { token: string }> => {
        try {
            const user = await UserModel.findOne({ email_address });
            if (!user) {
                return { status: false, message: 'invalid credencials' };
            }

            const isPasswordCorrect = EncryptionRepository.comparePassword(password, user.password)
            if (!isPasswordCorrect) {
                return { status: false, message: 'invalid credencials' };
            }

            if (user.is_banned) {
                return { status: false, message: 'this user is banned, please contact admin' };
            }

            return { status: true, data: {
                ...user,
                token: EncryptionRepository.encryptToken(user._id, Token.adminAccessToken)}
            }
        } catch (err) {
            return { status: false, message: err as string };
        }

    },
    signupUser: async ({ name, email_address, password } : SignupProps): IResponse<IUser & {token: string}> => {
        try {
            const isUserExisting = await UserModel.findOne({ email_address });
            if (isUserExisting) {
                return {
                    status: false,
                    message: 'email already exist',
                    error: [{ field: 'email_address', message: 'email already exist' }]
                };
            }
            password = EncryptionRepository.encryptPassword(password);

            const admin = await UserModel.create({ name, email_address, password });
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

export default AuthService;