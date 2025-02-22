import React from "react";
import {observer} from "mobx-react";
import {Layout} from "antd";
import {Header} from "antd/es/layout/layout";
import Menu from "domains/cabinet/components/menu";

interface IWrapperProps {
    children?: React.ReactNode;
}

const Wrapper: React.FC = observer((props: IWrapperProps) => {
    return (
        <Layout>
            <Header>
                <div className="logo" />
                <Menu />
            </Header>

            {props.children}
        </Layout>
    );
});

export default Wrapper;