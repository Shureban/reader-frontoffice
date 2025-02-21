import './styles.less';
import React from 'react';
import {Button, Form, Input, Typography} from 'antd';
import {LockOutlined, MailOutlined} from '@ant-design/icons';
import {AuthRoutes} from "routes/auth";
import {useRootStore} from "RootStoreContext";
import {AuthApi} from "api/entrypoint";
import {TRegistrationRequest} from "api/requests/auth";
import {observer} from "mobx-react";
import Storage from "storage/Storage";
import {CabinetRoutes} from "routes/cabinet";
import {applyFormErrorResponse} from "utils/form";

const {Text, Title, Link} = Typography;

const Registration: React.FC = observer(() => {
    const {appStore} = useRootStore();
    const [form]     = Form.useForm();

    const onFinish = (request: TRegistrationRequest) => {
        Promise.resolve()
            .then(() => appStore.lockPage())
            .then(() => AuthApi.registration(request)
                .then((response) => {
                    Storage.setApiToken(response.data.access_token);
                    window.location.href = CabinetRoutes.home()
                })
            )
            .catch((error) => applyFormErrorResponse(form, error))
            .finally(() => appStore.unlockPage());
    };

    return (
        <section className='wrapper'>
            <div className='container'>
                <div className='header'>
                    <Title className='title'>Sign up</Title>
                    <Text className='subtitle'>
                        Welcome in RBWord.com. Create new account here to read more.
                    </Text>
                </div>
                <Form
                    form={form}
                    onFinish={onFinish}
                    layout="vertical"
                    requiredMark="optional"
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {type: "email", required: true, message: "Please input your Email!"},
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined />}
                            placeholder="Email"
                            autoComplete="email"
                            autoFocus={true}
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {required: true, message: "Please input your Password!"},
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            type="password"
                            placeholder="Password"
                            autoComplete="password"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password_confirmation"
                        rules={[
                            {required: true, message: "Please input the password confirmation!"},
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            type="password"
                            placeholder="Password confirmation"
                            autoComplete="password"
                        />
                    </Form.Item>
                    <Form.Item className='footer'>
                        <Button block="true" type="primary" htmlType="submit">
                            Sign up
                        </Button>
                        <div className='registration-block'>
                            <Text>Have an account?</Text>{" "}
                            <Link href={AuthRoutes.login()}>Sign in</Link>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </section>
    );
});

export default Registration;