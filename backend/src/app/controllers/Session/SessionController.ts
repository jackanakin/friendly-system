import { Request, Response } from "express";
import jsonwebtoken from 'jsonwebtoken';
import * as Yup from 'yup';
import bcrypt from 'bcryptjs';

import authConfig from '../../../_config/auth';
import { User } from "../../../_lib/database/main";
import { internalErrorHandler } from "../../@exceptions/_handler/InternalErrorHandler";
import SessionControllerErrors from "../../@messages/controllers/Session/SessionControllerErrors";

class SessionController {
    async delete(req: Request, res: Response) {
        try {
            res.clearCookie('token', {
                httpOnly: true,
                sameSite: true,
            });

            res.clearCookie('user', {
                sameSite: true,
            });

            return res.status(200).send();
        } catch (error) {
            return internalErrorHandler(error, res);
        }
    }

    async store(req: Request, res: Response) {
        try {
            const schema = Yup.object().shape({
                email: Yup.string()
                    //.email()
                    .required(),
                password: Yup.string().required(),
            });

            if (!(await schema.isValid(req.body))) {
                return res
                    .status(SessionControllerErrors.authenticationError.code)
                    .json({ error: SessionControllerErrors.authenticationError.message });
            }

            const { email, password } = req.body;

            const user = await User.findOne({
                where: { email },
            });

            if (!user) {
                return res.status(SessionControllerErrors.authenticationError.code)
                    .json({ error: SessionControllerErrors.authenticationError.message });
            }

            const checkPassword = user.password_hash ? await bcrypt.compare(password, user.password_hash) : false;

            if (!checkPassword) {
                return res
                    .status(SessionControllerErrors.authenticationError.code)
                    .json({ error: SessionControllerErrors.authenticationError.message });
            }

            const { id, name } = user;

            return res.json({
                user: {
                    id,
                    name,
                    email,
                },
                token: jsonwebtoken.sign({ id }, authConfig.secret, {
                    expiresIn: authConfig.expiresIn,
                }),
            });
        } catch (error) {
            return internalErrorHandler(error, res);
        }
    }
}

export default new SessionController();