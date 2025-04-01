import './styles.less';
import React from "react";
import {observer} from "mobx-react";
import {Layout, Spin} from "antd";
import {Footer} from "antd/es/layout/layout";
import Menu from "domains/cabinet/components/menu";
import {useRootStore} from "RootStoreContext";

interface IWrapperProps {
    children?: React.ReactNode;
}

const Wrapper: React.FC = observer((props: IWrapperProps) => {
    const {appStore} = useRootStore();

    return (
        <Layout>
            {appStore.pageIsLocked() && (
                <div className='loader-overlay'>
                    <Spin size='large' />
                </div>
            )}

            <div className='content-wrapper'>
                {props.children}
            </div>

            <Footer className='cabinet-footer'>
                <Menu />
            </Footer>
        </Layout>
    );
});

export default Wrapper;