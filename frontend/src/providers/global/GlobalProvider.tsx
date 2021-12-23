import * as React from "react";

interface GlobalContextType {
    openMenu: boolean;
    toggleMenu(): void;
}

let GlobalContext = React.createContext<GlobalContextType>(null!);

export function GlobalProvider({ children }: { children: React.ReactNode }) {
    const [openMenu, setOpenMenu] = React.useState<boolean>(false);

    function toggleMenu(): void {
        setOpenMenu(!openMenu);
    };

    return <GlobalContext.Provider value={{ openMenu, toggleMenu }}>{children}</GlobalContext.Provider>;
}

export function useGlobal() {
    return React.useContext(GlobalContext);
}
