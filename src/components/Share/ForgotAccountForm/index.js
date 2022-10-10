import React from 'react';
import { Button, Card, Form, Input } from 'antd';
import { WEBSITE_NAME } from 'components/contants';

export default function ForgotAccountForm({ onFinish = () => {}, redirectTo = () => {} }) {
  return (
    <Card>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: 'email',
              message: 'Email không hợp lệ!',
            },
            {
              required: true,
              message: 'Vui lòng nhập email của bạn!',
            },
          ]}
        >
          <Input placeholder={`Email đăng nhập ${WEBSITE_NAME}`}/>
        </Form.Item>

        <Form.Item
          label="Họ và tên"
          name="loginId"
        >
          <Input placeholder={`Tên đăng nhập ${WEBSITE_NAME}`}/>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" size='large' htmlType="submit">
            Lấy lại mật khẩu
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
