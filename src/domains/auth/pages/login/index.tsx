import './styles.less';
import React from 'react';
import {Button, Checkbox, Form, Input, Typography} from 'antd';
import {AuthRoutes} from "routes/auth";
import {useRootStore} from "RootStoreContext";
import {AuthApi} from "api/entrypoint";
import {TLoginRequest} from "api/requests/auth";
import {observer} from "mobx-react";
import Storage from "storage/Storage";
import {CabinetRoutes} from "routes/cabinet";
import {applyFormErrorResponse} from "utils/form";
import BeeEmailIcon from "images/svg/BeeEmailIcon";
import BeeSafeIcon from "images/svg/BeeSafeIcon";

const {Text, Title, Link} = Typography;

const Login: React.FC = observer(() => {
    const {appStore} = useRootStore();
    const [form]     = Form.useForm();

    const onFinish = (request: TLoginRequest) => {
        Promise.resolve()
            .then(() => appStore.lockPage())
            .then(() => AuthApi.login(request)
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
                    <Title className='title'>Sign in</Title>
                    <Text className='subtitle'>
                        Welcome to BeeReader. Enter your email and password to sign in.
                    </Text>
                </div>
                <Form
                    form={form}
                    initialValues={{
                        remember: true,
                    }}
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
                            prefix={<BeeEmailIcon width={16} height={16} />}
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
                            prefix={<BeeSafeIcon width={16} height={16} />}
                            type="password"
                            placeholder="Password"
                            autoComplete="password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                        <Link className='forgot-link' href={AuthRoutes.forgotPassword()}>Forgot password?</Link>
                    </Form.Item>
                    <Form.Item className='footer'>
                        <Button block="true" type="primary" htmlType="submit">
                            Log in
                        </Button>
                        <div className='registration-block'>
                            <Text>Don't have an account?</Text>{" "}
                            <Link href={AuthRoutes.registration()}>Sign up now</Link>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </section>
    );
});

export default Login;