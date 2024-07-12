//@ts-check
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';

export const Token = {
    accessToken: process.env.ACCESS_TOKEN_SECRET! as TokenType,
    adminAccessToken: process.env.ADMIN_ACCESS_TOKEN_SECRET! as TokenType,
    refreshToken: process.env.REFRESH_TOKEN_SECRET! as TokenType,
    resetPassword: process.env.RESET_PASSWORD_SECRET! as TokenType,
    emailVerification: process.env.EMAIL_VERIFICATION_SECRET! as TokenType
}

type TokenType = '1111';

const EncryptionRepository = {
    encryptToken: (data: any, token: TokenType, expiresIn = 60 * 60 * 24 * 5) => {
        return jwt.sign(data, token, { expiresIn });
    },

    decryptToken: (data: any, token: TokenType) => {
        return jwt.verify(data, token);
    },

    createSpecialKey: ({prefix='', suffix='', removeDashes=false}) => {
        const secretKey = uuid().split('_').join('');
        if (removeDashes ) {
            const secretKeyWithDashes = secretKey.split('_').join('');
            return `${prefix}${secretKeyWithDashes}${suffix}`;
        }
        return `${prefix}${secretKey}${suffix}`;
    },

    verifyBearerToken: (data: string, token: TokenType) => {
        if (data === null || data === undefined) {
            return { status: false, error: 'Authentication failed'};
        }
        try {
            const token = data.split(" ",2)[1];
            const decoded = jwt.verify(token, token);
            return { status: true, data: decoded as any };
        }
        catch (error) {
            return { status: false, error: 'Authentication expired' };
        }
    },

    encryptPassword: (password:any) => {
        return bcrypt.hashSync(password, 10);
    },

    comparePassword: ( password: string, userPassword :string ) => {
        return bcrypt.compareSync(password, userPassword)
    },

    generateVerificationCode: (length: number) => {
        const characters = '0123456789';
        let randomString = '';
      
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          randomString += characters[randomIndex];
        }
      
        return {
            code: randomString,
            timeout: Date.parse((new Date()).toISOString()) + (1000 * 60 * 60)
        };
    },

    generateRandomStringCode: (length: number) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomString = '';
      
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          randomString += characters[randomIndex];
        }
      
        return randomString;
    }
}

export default EncryptionRepository;