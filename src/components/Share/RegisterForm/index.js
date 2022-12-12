import React from 'react';
import { Button, Form } from 'antd';
import BoxHeader from 'components/Share/BoxHeader';
import BoxCard from 'components/Share/BoxCard';
import InputText from 'components/Common/InputText';
import InputPassword from 'components/Common/InputPassword';

import './style.scss';

export default function RegisterForm({ onFinish = () => {}, redirectTo = () => {}}) {
  // eslint-disable-next-line
  return (
    <BoxCard className="sign-up-form__wrapper" style={{ maxWidth: 400 }}>
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
          name="phoneNumber"
          rules={[
            {
              required: true,
              message: 'Please enter phone!',
            },
          ]}
        >
          <InputText placeholder="Phone" />
        </Form.Item>

        <Form.Item
          name="storeName"
          rules={[
            {
              required: true,
              message: 'Please enter store name!',
            },
          ]}
        >
          <InputText placeholder="Store Name"  />
        </Form.Item>
        <Form.Item>
          <Button type="primary" size='large' htmlType="submit" className="ant-btn--full-width">
           Sign Up Now
          </Button>
        </Form.Item>
        <Form.Item>
          <div className="sign-up-form__note">
            Already have an account? <span className="link" onClick={() => redirectTo("/login")}>Log In</span>
          </div>
        </Form.Item>
      </Form>
    </BoxCard>
  );
}
