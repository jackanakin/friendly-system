import * as React from "react";
import {
    Routes,
    Route,
} from "react-router-dom";

import NotFound404Page from "../pages/misc/NotFound404Page";
import FtthPage from "../pages/private/FtthPage/FtthPage";
import PhoneSubscriberPage from "../pages/private/PhoneSubscriberPage/PhoneSubscriberPage";
import SignInPage from "../pages/public/SignIn/SignInPage";
import { RequireAuth } from "./RequireAuth";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<SignInPage />} />
            <Route element={<RequireAuth />}>
                <Route path="/" element={<FtthPage />} />
                <Route path="/ftth" element={<FtthPage />} />
                <Route path="/phone_subscriber" element={<PhoneSubscriberPage />} />
            </Route>
            <Route path="*" element={<NotFound404Page />} />
        </Routes>
    );
}