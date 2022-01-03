import { CircularProgress } from "@material-ui/core";
import React from "react";

import { FetchStatus } from "../../../@enum/api/FetchStatus";
import { useAuth } from "../../../providers/auth/AuthProvider";
import { Wrapper, Content } from "./styles";

export default function SignInPage() {
    const { signin, fetchLoginStatus } = useAuth();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const data = new FormData(event.target as HTMLFormElement);
        const email = data.get("email") as string;
        const password = data.get("password") as string;
        signin({ email, password });
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
                        {fetchLoginStatus.status === FetchStatus.LOADING ? <CircularProgress /> : "Entrar"}
                    </button>

                    {fetchLoginStatus.status === FetchStatus.FAILED && <p>{fetchLoginStatus.message}</p>}
                </form>
            </Content>
        </Wrapper>
    );
}