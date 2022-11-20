import React from 'react';
import { Button, Form } from 'antd';
import BoxHeader from 'components/Share/BoxHeader';
import BoxCard from 'components/Share/BoxCard';
import InputPassword from 'components/Common/InputPassword';
import InputText from 'components/Common/InputText';

import './style.scss';
export default function LoginForm({ onFinish = () => {}, redirectTo = () => {}, isAdminMode = false }) {
  return (
    <BoxCard className="sign-in-form__wrapper">
      <BoxHeader
        title="Sign in to Creative Space"
        description="Log in with your data that you entered during registration."
      />
      <Form
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          name="userName"
          rules={[
            {
              required: true,
              message: 'Please enter user name!',
            },
          ]}
        >
          <InputText placeholder="User Name"  />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please enter password!',
            },
          ]}
        >
          <InputPassword placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" size='large' htmlType="submit" className="ant-btn--full-width">
            Log in
          </Button>
        </Form.Item>
        {
          !isAdminMode && (
            <Form.Item>
              <div className="sign-in-form__note">
                Don't have an account? <span className="link" onClick={() => redirectTo("/register")}>Sign up</span>.
              </div>
            </Form.Item>
          )
        }
      </Form>
    </BoxCard>
  );
}
