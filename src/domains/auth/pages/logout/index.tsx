import React, {useEffect} from "react";
import {AuthRoutes} from "routes/auth";
import Storage from "storage/Storage";
import {useRootStore} from "RootStoreContext";

const Logout: React.FC = () => {
    const {appStore} = useRootStore();

    useEffect(() => {
        Promise.resolve()
            .then(() => appStore.lockPage())
            .then(() => Storage.dropApiToken())
            .then(() => window.location.href = AuthRoutes.login())
            .finally(() => appStore.unlockPage());
    }, []);

    return '';
};

export default Logout;