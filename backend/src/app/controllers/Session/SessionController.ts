import { Request, Response } from "express";
import jsonwebtoken from 'jsonwebtoken';
import * as Yup from 'yup';

import User from '../../models/User';
import authConfig from '../../../_config/auth';

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
        } catch (err) {
            console.log(err);
        }
        return res.status(500).send();
    }

    async store(req: Request, res: Response) {
        try {
            const schema = Yup.object().shape({
                email: Yup.string()
                    .email()
                    .required(),
                password: Yup.string().required(),
            });

            if (!(await schema.isValid(req.body))) {
                return res.status(400).json({ error: 'Validation error' });
            }

            const { email, password } = req.body;

            const user = await User.findOne({
                where: { email },
            });

            if (!user) {
                return res.status(401).json({ error: 'Authentication error' });
            }

            if (!(await user.checkPassword(password))) {
                return res.status(401).json({ error: 'Authentication error' });
            }
            const { id, name } = user as any;

            const tokens = jsonwebtoken.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            });

            const maxAge = 1000 * 60 * 60 * 24;

            res.cookie('token', tokens, {
                maxAge,
                httpOnly: true,
                sameSite: true,
            });

            res.cookie('user', JSON.stringify({ name, email }), {
                maxAge,
                sameSite: true,
            });

            return res.status(200).send();
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: 'Authentication error' });
        }
    }
}

export default new SessionController();