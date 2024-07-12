import { Request, Response } from "express";
import EncryptionRepository, { Token } from "../../data/repositories/encryption";

export const AdminRole = (req: Request, res: Response, next: () => any) => {
    try {
        if (!req.headers['authorization']) {
            res.status(500).json({ status: false, noToken: true, message: "missing auth key" });
            return;
        }
        const response = EncryptionRepository.verifyBearerToken(req.headers['authorization'], Token.accessToken);
        if ( response.status === false ) {
            return res.status(403).json({ status: response.status, code: 403, noToken: true, error: [{message: response.error}] });
        }
        (req as Request & { admin: { id: string }}).admin = response.data;
        return next();
    } catch (error) {
        res.status(500).json({ status: false, noToken: true, message: "unable to authenticate admin" });
    }
}