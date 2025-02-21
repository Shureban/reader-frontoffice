import {message} from 'antd';

class AlertNotification {
    showError(content: string) {
        console.log(12);
        message.error(content);
    }

    showInfo(content: string) {
        message.info(content);
    }
}

export default new AlertNotification();