import React, {ReactNode} from "react";
import {observer} from "mobx-react";
import {Navigate, Outlet} from "react-router-dom";
import {useRootStore} from "RootStoreContext";
import {CabinetRoutes} from "routes/cabinet";

interface IGuestAccessProps {
    children: ReactNode;
}

const GuestAccess = observer(({children}: IGuestAccessProps) => {
    const {appStore} = useRootStore();
    const {user}     = appStore;

    const isAuthenticated = user !== null;
    if (isAuthenticated) {
        return <Navigate to={CabinetRoutes.home()} replace />;
    }

    return children ? <>{children}</> : <Outlet />;
});

export default GuestAccess;
