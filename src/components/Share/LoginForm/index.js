import React from 'react';
import { Button, Card, Form, Input } from 'antd';
import BoxHeader from 'components/Share/BoxHeader';

export default function LoginForm({ onFinish = () => {}, redirectTo = () => {} }) {
  return (
    <Card>
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
          <Input placeholder="User Name"  />
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
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" size='large' htmlType="submit">
            Log in
          </Button>
        </Form.Item>
        <Form.Item>
          {/*<div style={{ textAlign: 'center'}}>*/}
          {/*  Don't have an account? <a onClick={() => redirectTo("/register")}>Sign up</a>.*/}
          {/*</div>*/}
        </Form.Item>
      </Form>
    </Card>
  );
}
