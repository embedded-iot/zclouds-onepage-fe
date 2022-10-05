import React from 'react';
import { Button, Card, Form, Input } from 'antd';
import { WEBSITE_NAME } from 'components/contants';

export default function LoginForm({ onFinish = () => {}, redirectTo = () => {} }) {
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
          label="Tên đăng nhập"
          name="userName"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên đăng nhập của bạn!',
            },
          ]}
        >
          <Input placeholder={`Tên đăng nhập ${WEBSITE_NAME}`}  />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập mật khẩu đăng nhập của bạn!',
            },
          ]}
        >
          <Input.Password placeholder={`Mật khẩu ${WEBSITE_NAME}`} />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" size='large' htmlType="submit">
            Đăng nhập
          </Button>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <>
            <div>
              Quên mật khẩu?
              <Button type="link" danger onClick={() => redirectTo("/forgot-account")}>Lấy lại tại đây</Button>
            </div>
            <div>
              Nếu bạn đã chưa có tài khoản,
              <Button type="link" danger onClick={() => redirectTo("/register")}>Đăng ký tại đây</Button>
            </div>
          </>
        </Form.Item>
      </Form>
    </Card>
  );
}
