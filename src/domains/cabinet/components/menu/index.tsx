import './styles.less';
import React from "react";
import {observer} from "mobx-react";
import {CabinetRoutes} from "routes/cabinet";
import {AuthRoutes} from "routes/auth";
import {useNavigate} from "react-router-dom";


const Menu: React.FC = observer(() => {
    const navigate = useNavigate();

    return (
        <div className='menu'>
            <div className='menu__left-section'>
                <div className="home" onClick={() => navigate(CabinetRoutes.home())}>
                    <img src='/logo-with-text.png' alt='logo' />
                </div>
            </div>
            <div className='menu__right-section'>
                <div className='menu__item' onClick={() => navigate(AuthRoutes.logout())}>Logout</div>
            </div>
        </div>
    );
});

export default Menu;