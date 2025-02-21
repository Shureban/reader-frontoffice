import React, {ReactNode} from "react";
import {Navigate, Outlet} from "react-router-dom";
import {useRootStore} from "RootStoreContext";
import {observer} from "mobx-react";
import {AuthRoutes} from "routes/auth";

interface IAuthAccessProps {
    children: ReactNode;
}

const AuthAccess = observer(({children}: IAuthAccessProps) => {
    const rootStore  = useRootStore();
    const {appStore} = rootStore;

    const isAuthenticated = appStore.user !== null;
    if (isAuthenticated) {
        return children ? <>{children}</> : <Outlet />;
    }

    return <Navigate to={AuthRoutes.login()} replace />;
});

export default AuthAccess;
