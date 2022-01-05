import * as React from "react";
import {
    Routes,
    Route,
} from "react-router-dom";

import NotFound404Page from "../pages/misc/NotFound404Page";
import CreateUserPage from "../pages/private/CreateUserPage/CreateUserPage";
import FtthPage from "../pages/private/FtthPage/FtthPage";
import GponPage from "../pages/private/GponPage/GponPage";
import PhoneSubscriberPage from "../pages/private/PhoneSubscriberPage/PhoneSubscriberPage";
import SignInPage from "../pages/public/SignIn/SignInPage";
import { RequireAuth } from "./RequireAuth";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<SignInPage />} />
            <Route element={<RequireAuth />}>
                <Route path="/" element={<FtthPage />} />
                <Route path="/gpon" element={<GponPage />} />
                <Route path="/ftth" element={<FtthPage />} />
                <Route path="/phone_subscriber" element={<PhoneSubscriberPage />} />
                <Route path="/create_user" element={<CreateUserPage />} />
            </Route>
            <Route path="*" element={<NotFound404Page />} />
        </Routes>
    );
}