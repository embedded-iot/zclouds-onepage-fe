import React from 'react';
import { Button, Card, Form, Input, Typography } from 'antd';
import { WEBSITE_NAME } from 'components/contants';
const { Text } = Typography;

export default function UserDetailForm({ onFinish = () => {}, redirectTo = () => {}}) {
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
        layout="vertical"
      >
        <Form.Item
          label="Email"
          name="email"
        >
          <Input disabled placeholder={`Tên đăng nhập ${WEBSITE_NAME}`}/>
          <Text type="danger">Email dùng để sử dụng khi quên mật khẩu, vui lòng nhập đúng Email vì chỉ được thay đổi 1 lần.</Text>
        </Form.Item>
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
        <Text>* Để trống nếu không muốn thay đổi mật khẩu</Text>
        <Form.Item
          label="Mật khẩu"
          name="password"
        >
          <Input.Password placeholder={`Mật khẩu ${WEBSITE_NAME}`}/>
        </Form.Item>
        <Form.Item
          label="Nhập lại mật khẩu"
          name="password"
        >
          <Input.Password placeholder={`Nhập lại mật khẩu ${WEBSITE_NAME}`}/>
        </Form.Item>

        <Form.Item>
          <Button type="primary" size='large' htmlType="submit">
           Cập nhập thông tin
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
