import './styles.less';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import GuestAccess from "policies/guest-access";
import {AuthRoutes} from "routes/auth";
import {isMobile} from 'react-device-detect';
import Login from "domains/auth/pages/login";
import {useRootStore} from "RootStoreContext";
import React, {useEffect} from "react";
import Storage from "storage/Storage";
import {UsersApi} from "api/entrypoint";
import {Spin} from "antd";
import {observer} from "mobx-react";
import {CabinetRoutes} from "routes/cabinet";
import AuthAccess from "policies/auth-access";
import Registration from "domains/auth/pages/registration";
import Home from "domains/cabinet/pages/home";
import BookView from "domains/cabinet/pages/book-view";
import Logout from "domains/auth/pages/logout";
import BookReading from "domains/cabinet/pages/book-reading";
import BookReadingStore from "domains/cabinet/pages/book-reading/store";

const App: React.FC = observer(() => {
    if (!isMobile) {
        return <div>Is not a mobile device</div>;
    }

    const rootStore  = useRootStore();
    const {appStore} = rootStore;

    useEffect(() => {
        if (!Storage.hasApiToken()) {
            return appStore.setIsReady(true);
        }

        Promise.resolve(UsersApi.me())
            .then((user) => appStore.setUser(user))
            .catch((error) => console.log(error))
            .finally(() => appStore.setIsReady(true));
    }, []);

    if (!appStore.isReady) {
        return (
            <div className='main-loader '>
                <Spin size='large' />
            </div>
        );
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path={AuthRoutes.login()}
                    element={
                        <GuestAccess>
                            <Login />
                        </GuestAccess>
                    }
                />
                <Route
                    path={AuthRoutes.registration()}
                    element={
                        <GuestAccess>
                            <Registration />
                        </GuestAccess>
                    }
                />
                <Route
                    path={AuthRoutes.forgotPassword()}
                    element={
                        <GuestAccess>
                            <div>RecoveryPassword</div>
                            {/*<RecoveryPassword key="forgot" />*/}
                        </GuestAccess>
                    }
                />
                <Route
                    path={AuthRoutes.resetPassword()}
                    element={
                        <GuestAccess>
                            <div>ResetPassword</div>
                            {/*<ResetPassword key="reset" />*/}
                        </GuestAccess>
                    }
                />
                <Route
                    path={AuthRoutes.logout()}
                    element={
                        <AuthAccess>
                            <Logout />
                        </AuthAccess>
                    }
                />
                <Route
                    path={CabinetRoutes.home()}
                    element={
                        <AuthAccess>
                            <Home />
                        </AuthAccess>
                    }
                />
                <Route
                    path={CabinetRoutes.bookPreview()}
                    element={
                        <AuthAccess>
                            <BookView />
                        </AuthAccess>
                    }
                />
                <Route
                    path={CabinetRoutes.bookReading()}
                    element={
                        <AuthAccess>
                            <BookReading store={BookReadingStore.reinitializeInstance()} />
                        </AuthAccess>
                    }
                />

                {/*<Route path="*" element={<Error />} />*/}
            </Routes>
        </BrowserRouter>
    );
});

export default App
