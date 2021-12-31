import * as React from "react";

import { AuthProvider } from "./auth/AuthProvider";
import { FtthProvider } from "./ftth/FtthProvider";
import { GlobalProvider } from "./global/GlobalProvider";

export function AppProvider({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <GlobalProvider>
                <FtthProvider>
                    {children}
                </FtthProvider>
            </GlobalProvider>
        </AuthProvider>
    );
}