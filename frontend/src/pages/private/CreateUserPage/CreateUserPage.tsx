import { CircularProgress } from '@material-ui/core';
import React, { useState } from 'react';
import { FetchIdle, FetchRunning, FetchSuccessful } from '../../../@dto/api/FetchStatus';
import { FetchStatus } from '../../../@enum/api/FetchStatus';
import AxiosFetch from '../../../@types/api/AxiosFetch';

import AppBackground from '../../../components/AppLayout/AppBackground/AppBackground';
import { usePromise } from '../../../hooks/@promises/usePromise';
import { createUser } from './fun/createUser';

export default function CreateUserPage() {
    const { promise } = usePromise();

    const [createStatus, setCreateStatus] = useState<AxiosFetch>(FetchIdle);

    function resolve(data: string) {
        console.log("resolve")
        console.log(data);
        setCreateStatus(FetchSuccessful);

        const doc = document.getElementById("form") as any;
        doc.reset();
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setCreateStatus(FetchRunning);
        const data = new FormData(event.target as HTMLFormElement);
        const name = data.get("name") as string;
        const email = data.get("email") as string;
        const password = data.get("password") as string;

        createUser({ name, email, password }, promise, resolve, setCreateStatus);
    }

    return (
        <AppBackground>
            <form id="form" noValidate onSubmit={handleSubmit}>
                <p>Create user</p>

                <input
                    name="name"
                    id="name"
                    placeholder="Seu nome"
                    autoComplete="off"
                />

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
                    {createStatus.status === FetchStatus.LOADING ? <CircularProgress /> : "Criar"}
                </button>

                {createStatus.status === FetchStatus.FAILED && <p>Erro : {createStatus.message}</p>}
                {createStatus.status === FetchStatus.SUCCESS && <p>Usuário criado!</p>}
            </form>
        </AppBackground>
    );
}
