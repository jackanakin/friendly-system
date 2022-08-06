import Cookies from "js-cookie";
import * as React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FetchIdle, FetchRunning } from "../../@dto/api/FetchStatus";
import { FetchStatus } from "../../@enum/api/FetchStatus";
import AxiosFetch from "../../@types/api/AxiosFetch";

import SignInDTO from "../../@types/models/user/SignInDTO";
import User from "../../@types/models/user/User";
import api from "../../api/api";
import { usePromise } from "../../hooks/@promises/usePromise";
import { post_sessions } from "./fun/post_sessions";
import { signin_schema } from "./fun/validator/post_signin";

interface AuthContextType {
    user: User | null;
    fetchLoginStatus: AxiosFetch;

    signin: (user: SignInDTO) => void;
    signout: () => Promise<void>;
}

let AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const { promise } = usePromise();
    const location = useLocation();
    const navigate = useNavigate();

    const userCookie = Cookies.get("user");
    const storedUser = userCookie ? JSON.parse(userCookie) as User : null

    const [user, setUser] = React.useState<User | null>(storedUser);
    const [fetchLoginStatus, setFetchLoginStatus] = useState<AxiosFetch>(FetchIdle);

    const resolveSignIn = () => {
        const userCookie = Cookies.get("user");

        if (userCookie) {
            const parse = JSON.parse(userCookie) as User;
            setUser(parse);

            //const from = location?.state?.from?.pathname || "/";
            const from = (location as any).state?.from?.pathname || "/"; 
            navigate(from, { replace: true });
        } else {
            console.log("auth ok but userCookie empty");
            //toast error
            setUser(null);
        }
    }

    const signin = async (signinDTO: SignInDTO): Promise<void> => {
        setFetchLoginStatus(FetchRunning);

        const isValid = await signin_schema.isValid(signinDTO);
        if (!isValid) {
            setFetchLoginStatus({
                status: FetchStatus.FAILED,
                message: "Falha na autenticação"
            });
        } else {
            post_sessions({ user: signinDTO }, promise, resolveSignIn, setFetchLoginStatus);
        }
    }

    async function signout() {
        try {
            await api.delete(`sessions`);
        } catch (err) {
            console.log("signout exception");
            //toast error
        }
        setUser(null);
    };

    return <AuthContext.Provider value={{
        user,
        signin, signout, fetchLoginStatus
    }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return React.useContext(AuthContext);
}
