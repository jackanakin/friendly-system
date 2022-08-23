import * as Yup from 'yup';
import bcrypt from 'bcryptjs';

import { User } from "../../_lib/database/main";
import CreateUserDTO from '../@dto/user/CreateUserDTO';
import ListUserDTO from '../@dto/user/ListUserDTO';

class UserService {

    async list(): Promise<ListUserDTO[] | string> {
        try {
            const userList = (await User.findAll({
                attributes: ["email", "name"]
            })).map(ap => ap.toJSON() as ListUserDTO);

            return userList;
        } catch (error: any) {
            return String(error);
        }
    }

    async remove(userEmail: string): Promise<string> {
        try {
            const res = await User.destroy({
                where: {
                    email: userEmail
                }
            });

            return `${res} usuário(s) removido(s)`;
        } catch (error: any) {
            return String(error);
        }
    }

    async create(user: CreateUserDTO): Promise<string> {
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required(),
                email: Yup.string()
                    .email()
                    .required(),
                password: Yup.string()
                    .required()
                    .min(8),
            });

            if (!(await schema.isValid(user))) {
                return "Atributos inválidos!";
            }

            const userExists = await User.findOne({
                where: { email: user.email },
            });

            if (userExists) {
                return "E-mail em uso!";
            }

            const password_hash = await bcrypt.hash(user.password, 8);
            const { id, name, email } = await User.create({
                ...user, enabled: true, password_hash
            });

            return "Usuário criado";
        } catch (error: any) {
            return String(error);
        }
    }
}

export default new UserService();
