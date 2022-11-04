import React from 'react';
import { Button, Card, Form, Input } from 'antd';
import BoxHeader from 'components/Share/BoxHeader';

export default function RegisterForm({ onFinish = () => {}, redirectTo = () => {}}) {
  // eslint-disable-next-line
  return (
    <Card>
      <BoxHeader
        title="Sign up"
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
          <Input placeholder="Email"/>
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
          <Input placeholder="Phone" />
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
          <Input placeholder="Store Name"  />
        </Form.Item>
        <Form.Item>
          <Button type="primary" size='large' htmlType="submit">
           Sign Up Now
          </Button>
        </Form.Item>
        <Form.Item>
          <div style={{ textAlign: 'center'}}>
            Already have an account? <a onClick={() => redirectTo("/login")}>Log In</a>
          </div>
        </Form.Item>
      </Form>
    </Card>
  );
}
