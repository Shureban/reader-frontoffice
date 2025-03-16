import React from "react";
import ReactDOM from "react-dom/client";
import App from './App';
import {RootStoreProvider} from "RootStoreContext";
import {ConfigProvider} from "antd";
import './main.less';

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

const brandYellowColor       = '#f9b801';
const brandYellowBorderColor = '#bd8a00';

root.render(
    <RootStoreProvider>
        <ConfigProvider
            theme={{
                components: {
                    Button: {
                        colorPrimary: brandYellowColor,
                        colorPrimaryBorder: brandYellowBorderColor,
                        algorithm: true,
                    },
                    Input: {
                        colorPrimary: brandYellowColor,
                        algorithm: true,
                    },
                    Checkbox: {
                        colorPrimary: brandYellowColor,
                        algorithm: true,
                    }
                }
            }}
        >
            <App />
        </ConfigProvider>
    </RootStoreProvider>
);
