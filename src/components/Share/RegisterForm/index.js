import React from 'react';
import { Button, Form } from 'antd';
import BoxHeader from 'components/Share/BoxHeader';
import BoxCard from 'components/Share/BoxCard';
import InputText from 'components/Common/InputText';
import InputPassword , { validatePassword } from 'components/Common/InputPassword';
import { ROUTERS } from 'components/contants';

import './style.scss';

export default function RegisterForm({ onFinish = () => {}, redirectTo = () => {}, hasBoxCard = true }) {
  // eslint-disable-next-line
  const BoxWrapper = hasBoxCard ? BoxCard : 'div';
  return (
    <BoxWrapper className="sign-up-form__wrapper" style={{ width: hasBoxCard && 400 }}>
      <BoxHeader
        title="Sign up"
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
          style={{ marginBottom: 20}}
        >
          <InputText placeholder="Email"/>
        </Form.Item>
        <Form.Item>
          <div className="sign-up-form__email-note">
            Please enter the correct email to receive the account verification code
          </div>
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please enter password!',
            },
            validatePassword,
          ]}
        >
          <InputPassword placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" size='large' htmlType="submit" className="ant-btn--full-width">
           Sign Up Now
          </Button>
        </Form.Item>
        <Form.Item>
          <div className="sign-up-form__note">
            Already have an account? <span className="link" onClick={() => redirectTo(ROUTERS.LOGIN)}>Log In</span>
          </div>
        </Form.Item>
      </Form>
    </BoxWrapper>
  );
}
