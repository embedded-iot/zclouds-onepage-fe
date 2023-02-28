import React from 'react';
import { Button, Form } from 'antd';
import BoxHeader from 'components/Share/BoxHeader';
import BoxCard from 'components/Share/BoxCard';
import InputPassword from 'components/Common/InputPassword';
import InputText from 'components/Common/InputText';
import { ROUTERS } from 'components/contants';

import './style.scss';

export default function LoginForm({ onFinish = () => {}, hasBoxCard = true, isAdminMode = false, redirectTo = () => {} }) {
  const BoxWrapper = hasBoxCard ? BoxCard : 'div';
  return (
    <BoxWrapper className="sign-in-form__wrapper" style={{ width: hasBoxCard && 400 }}>
      <BoxHeader
        title="Sign in to Onepage"
        description="Log in with your data that you entered during registration."
      />
      <Form
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              message: 'Email is invalid!',
            },
            {
              required: true,
              message: 'Please enter email!',
            },
          ]}
        >
          <InputText placeholder="Email"/>
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
        <Form.Item>
          {
            !isAdminMode && (
              <div className="sign-in-form__note">
                Don't have an account? <span className="link" onClick={() => redirectTo(ROUTERS.REGISTER)}>Sign up</span>.
              </div>
            )
          }
          <div className="sign-in-form__note">
            Forgot password? <span className="link" onClick={() => redirectTo(ROUTERS.FORGOT_PASSWORD)}>Here</span>.
          </div>
        </Form.Item>

      </Form>
    </BoxWrapper>
  );
}
