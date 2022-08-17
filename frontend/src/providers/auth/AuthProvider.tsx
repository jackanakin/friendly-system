import * as React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FetchIdle, FetchRunning } from "../../@dto/api/FetchStatus";
import { FetchStatus } from "../../@enum/api/FetchStatus";
import AxiosFetch from "../../@types/api/AxiosFetch";
import { SignInDTO, SignInResponseDTO } from "../../@types/models/user/SignInDTO";

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

    const userStorage = localStorage.getItem("user");
    const storedUser = userStorage ? JSON.parse(userStorage) as User : null;

    const tokenStorage = localStorage.getItem("token");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const storedToken = tokenStorage ? ((api.defaults.headers as any).Authorization = `Bearer ${tokenStorage}`) : null;

    const [user, setUser] = React.useState<User | null>(storedUser);
    const [fetchLoginStatus, setFetchLoginStatus] = useState<AxiosFetch>(FetchIdle);

    const resolveSignIn = (response: SignInResponseDTO) => {
        if (response) {
            const { user, token } = response;
            setUser(user);

            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", token);

            (api.defaults.headers as any).Authorization = `Bearer ${token}`;

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
        (api.defaults.headers as any).Authorization = null;
        localStorage.removeItem("user");
        localStorage.removeItem("token");
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
