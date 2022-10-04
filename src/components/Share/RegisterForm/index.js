import React from 'react';
import { Button, Card, Form, Input } from 'antd';
import { WEBSITE_NAME } from 'components/contants';

export default function RegisterForm({ onFinish = () => {}, redirectTo = () => {}}) {
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
          name="username"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên đăng nhập của bạn!',
            },
          ]}
        >
          <Input placeholder={`Tên đăng nhập ${WEBSITE_NAME}`}/>
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          name="phoneNumber"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập số điện thoại của bạn!',
            },
          ]}
        >
          <Input placeholder={`Số điện thoại ${WEBSITE_NAME}`}/>
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
          <Input.Password placeholder={`Mật khẩu ${WEBSITE_NAME}`}/>
        </Form.Item>
        <Form.Item
          label="Nhập lại mật khẩu"
          name="password"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập lại mật khẩu đăng nhập của bạn!',
            },
          ]}
        >
          <Input.Password placeholder={`Nhập lại mật khẩu ${WEBSITE_NAME}`}/>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" size='large' htmlType="submit">
           Đăng ký
          </Button>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <p>
            Nếu bạn đã có tài khoản,
            <Button type="link" danger onClick={() => redirectTo("/login")}>Đăng nhập tại đây</Button>
          </p>
        </Form.Item>
      </Form>
    </Card>
  );
}
