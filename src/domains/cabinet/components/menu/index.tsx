import './styles.less';
import React from "react";
import {observer} from "mobx-react";
import {CabinetRoutes} from "routes/cabinet";
import {AuthRoutes} from "routes/auth";
import {useNavigate} from "react-router-dom";
import {HomeFilled, LogoutOutlined} from "@ant-design/icons";

const Menu: React.FC = observer(() => {
    const navigate = useNavigate();

    return (
        <div className='menu'>
            <div className='menu__left-section'>
                <div className="menu__button" onClick={() => navigate(CabinetRoutes.home())}>
                    <HomeFilled />
                </div>
            </div>
            <div className='menu__right-section'>
                <div className='menu__button' onClick={() => navigate(AuthRoutes.logout())}>
                    <LogoutOutlined />
                </div>
            </div>
        </div>
    );
});

export default Menu;