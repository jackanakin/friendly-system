import * as React from "react";
import Cookies from "js-cookie";

import api from "../../../api/api";
import { useAuth } from "../../../providers/auth/AuthProvider";

export default function HomePage() {
    const storedJwt = localStorage.getItem('token');
    const { signout } = useAuth();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        await signout();
    }

    async function ftth() {
        console.log("calling ftth")
        const { data } = await api.get(`ftth/697`);
        console.log(data)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h3>HomePage</h3>
                <p>{storedJwt}</p>
                <button type="submit">Logout</button>
            </form>
            <button onClick={() => ftth()}>call ftth</button>
        </div>
    );
}