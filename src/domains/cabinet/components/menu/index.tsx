import React from "react";
import {observer} from "mobx-react";
import {Menu as AntMenu} from "antd";

const Menu: React.FC = observer(() => {
    return (
        <AntMenu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} items={[
            {key: '1', label: 'Home'},
            {key: '2', label: 'About'},
            {key: '3', label: 'Contact'},
        ]} />
    );
});

export default Menu;