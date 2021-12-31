import * as React from "react";

import { AuthProvider } from "./auth/AuthProvider";
import { GlobalProvider } from "./global/GlobalProvider";

export function AppProvider({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <GlobalProvider>
                {children}
            </GlobalProvider>
        </AuthProvider>
    );
}