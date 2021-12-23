import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useAuth } from "../../../providers/auth/AuthProvider";


import { Wrapper, Content } from "./styles";
//import logo from "assets/imgs/logo.png";

const schema = Yup.object().shape({
    email: Yup.string()
        .email("Insira um e-mail válido")
        .required("O e-mail é obrigatório"),
    password: Yup.string()
        .min(6, "Mínimo de 6 caracteres")
        .required("A senha é obrigatória")
});

export default function SignInPage() {
    const { signin } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | null>(null);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            setLoading(true);
            setError(null);

            const data = new FormData(event.target as HTMLFormElement);
            const email = data.get("email") as string;
            const password = data.get("password") as string;

            const isValid = await schema.isValid({ email, password });

            if (!isValid) {
                setError("Falha de autenticação");
            } else {
                await signin({ email, password });
                const from = location.state?.from?.pathname || "/";
                navigate(from, { replace: true });
            }
        } catch (err) {
            console.log(err);
            setLoading(false);
            setError("Erro interno");
        }
    }

    return (
        <Wrapper>
            <Content>
                <form noValidate onSubmit={handleSubmit}>
                    <p>This computer system is the property of BrasRede Telecomunicações Ltda. It is for authorized use only.  By using this system, all users acknowledge notice of, and agree to comply with the company Acceptable Use of Information Technology Resources Policy (“AUP”). Unauthorized or improper use of this system may result in administrative disciplinary action, civil charges/criminal penalties, and/or other sanctions. By continuing to use this system you indicate your awareness of and consent to these terms and conditions of use.</p>

                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Seu login"
                        autoComplete="off"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Sua senha"
                    />

                    <button type="submit">
                        {loading ? "Carregando..." : "Acessar"}
                    </button>

                    {error && <p>{error}</p>}
                </form>
            </Content>
        </Wrapper>
    );
}