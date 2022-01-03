import { Request, Response } from "express";
import * as Yup from 'yup';

import { User } from "../../../_lib/database/main";

class UserController {
    async store(req: Request, res: Response) {
        return res.status(400).json({ error: 'Create disabled' });

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
            password: Yup.string()
                .required()
                .min(6),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation error' });
        }

        const userExists = await User.findOne({
            where: { email: req.body.email },
        });

        if (userExists) {
            return res.status(400).json({ error: 'E-mail already in use' });
        }

        req.body.enabled = true
        const { id, name, email } = await User.create(req.body);
        return res.json({ id, name, email });
    }
}

export default new UserController();