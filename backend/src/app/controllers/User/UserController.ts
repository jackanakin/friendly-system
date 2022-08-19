import { Request, Response } from "express";
import * as Yup from 'yup';
import bcrypt from 'bcryptjs';

import { User } from "../../../_lib/database/main";
import appConfig from "../../../_config/app";
import { TrueFalseEnum } from "../../../_config/@enum/TrueFalseEnum";
import { internalErrorHandler } from "../../@exceptions/_handler/InternalErrorHandler";

class UserController {
    async store(req: Request, res: Response) {
        try {
            return res.status(400).json({ error: 'Create disabled' });
            if (appConfig.CREATE_USER_ENABLED !== TrueFalseEnum.true) {
                return res.status(400).json({ error: 'Create disabled' });
            }

            const schema = Yup.object().shape({
                name: Yup.string().required(),
                email: Yup.string()
                    .email()
                    .required(),
                password: Yup.string()
                    .required()
                    .min(8),
            });

            if (!(await schema.isValid(req.body))) {
                return res.status(400).json({ error: 'Erro de validação' });
            }

            const userExists = await User.findOne({
                where: { email: req.body.email },
            });

            if (userExists) {
                return res.status(400).json({ error: 'E-mail em uso' });
            }

            req.body.enabled = true;
            req.body.password_hash = await bcrypt.hash(req.body.password, 8);
            const { id, name, email } = await User.create(req.body);
            return res.json("Usuário criado");
        } catch (error: any) {
            return internalErrorHandler(error, res);
        }
    }
}

export default new UserController();