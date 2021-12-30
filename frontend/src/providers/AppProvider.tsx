import * as React from "react";

import { AuthProvider } from "./auth/AuthProvider";
import { FtthProvider } from "./ftth/FtthProvider";
import { GlobalProvider } from "./global/GlobalProvider";
import { GponProvider } from "./gpon/GponProvider";

export function AppProvider({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <GlobalProvider>
                <FtthProvider>
                    <GponProvider>
                        {children}
                    </GponProvider>
                </FtthProvider>
            </GlobalProvider>
        </AuthProvider>
    );
}