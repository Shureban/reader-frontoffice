import React from "react";
import ReactDOM from "react-dom/client";
import App from './App';
import {RootStoreProvider} from "RootStoreContext";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <RootStoreProvider>
        <App />
    </RootStoreProvider>
);
