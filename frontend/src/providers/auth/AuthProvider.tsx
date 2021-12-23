import Cookies from "js-cookie";
import * as React from "react";
import SignInDTO from "../../@types/models/user/SignInDTO";
import User from "../../@types/models/user/User";
import api from "../../api/api";

interface AuthContextType {
    user: User | null;
    signin: (user: SignInDTO) => Promise<void>;
    signout: () => Promise<void>;
}

let AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const userCookie = Cookies.get("user");
    const storedUser = userCookie ? JSON.parse(userCookie) as User : null

    const [user, setUser] = React.useState<User | null>(storedUser);

    async function signin(user: SignInDTO) {
        await api.post(`sessions`, user);
        const userCookie = Cookies.get("user");

        if (userCookie) {
            const parse = JSON.parse(userCookie) as User;
            setUser(parse);
        } else {
            console.log("auth ok but userCookie empty");
            //toast error
            setUser(null);
        }
    };

    async function signout() {
        try {
            await api.delete(`sessions`);
        } catch (err) {
            console.log("signout exception");
            //toast error
        }
        setUser(null);
    };

    return <AuthContext.Provider value={{ user, signin, signout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return React.useContext(AuthContext);
}
