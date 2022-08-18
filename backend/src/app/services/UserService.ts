import * as Yup from 'yup';
import bcrypt from 'bcryptjs';

import { User } from "../../_lib/database/main";
import CreateUserDTO from '../@dto/user/CreateUserDTO';

class UserService {
    async removeUser(userEmail: string): Promise<string> {
        try {
            await User.destroy({
                where: {
                    email: userEmail
                }
            });

            return ("Usuário removido");
        } catch (error: any) {
            return String(error);
        }
    }

    async createUser(user: CreateUserDTO): Promise<string> {
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
                throw new Error("Atributos inválidos!");
            }

            const userExists = await User.findOne({
                where: { email: user.email },
            });

            if (userExists) {
                throw new Error("E-mail em uso!");
            }

            const password_hash = await bcrypt.hash(user.password, 8);
            const { id, name, email } = await User.create({
                ...user, enabled: true, password_hash
            });

            return ("Usuário criado");
        } catch (error: any) {
            return String(error);
        }
    }
}

export default new UserService();
