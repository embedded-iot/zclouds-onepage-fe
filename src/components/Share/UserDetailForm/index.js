import React, { useState } from 'react';
import { Button, Card, Form, Input, Typography } from 'antd';
import { WEBSITE_NAME } from 'components/contants';
const { Text } = Typography;

export default function UserDetailForm({ initialValues = {}, onFinish = () => {}}) {
  const [isInputPassword, setInputPassword] = useState(false);
  const [form] = Form.useForm();
  const onValuesChange = (value, allValues) => {
    setInputPassword(allValues.oldPassword || allValues.newPassword);
    if (!allValues.oldPassword && !allValues.newPassword) {
      form.resetFields(['oldPassword', 'newPassword']);
    }
  }

  return (
    <Card>
      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={initialValues}
        onFinish={onFinish}
        onValuesChange={onValuesChange}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Họ và tên"
          name="name"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập họ tên của bạn!',
            },
          ]}
        >
          <Input placeholder={`Tên đăng nhập ${WEBSITE_NAME}`}/>
        </Form.Item>
        <Form.Item
          label="Tên đăng nhập"
          name="loginId"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên đăng nhập của bạn!',
            },
          ]}
        >
          <Input disabled placeholder={`Tên đăng nhập ${WEBSITE_NAME}`}/>
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
          label="E-mail"
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
          <Input disabled placeholder={`Email ${WEBSITE_NAME}`}/>
        </Form.Item>
        <Form.Item
          label="Địa chỉ"
          name="address"
        >
          <Input disabled placeholder={`Địa chỉ ${WEBSITE_NAME}`}/>
        </Form.Item>
        <Form.Item
          label="Đường đẫn ảnh đại diện"
          name="avatar"
          rules={[
            {
              type: 'url',
              message: 'Đường dẫn ảnh đại diện không hợp lệ!',
            },
          ]}
        >
          <Input disabled placeholder={`https://.../image.jpg ${WEBSITE_NAME}`}/>
        </Form.Item>
        <Text>* Để trống nếu không muốn thay đổi mật khẩu</Text>
        <Form.Item
          label="Mật khẩu cũ"
          name="oldPassword"
          rules={[
            {
              required: isInputPassword,
              message: 'Vui lòng nhập nhập mật khẩu cũ của bạn!',
            },
          ]}
        >
          <Input.Password placeholder={`Mật khẩu cũ ${WEBSITE_NAME}`}/>
        </Form.Item>
        <Form.Item
          label="Mật khẩu mới"
          name="newPassword"
          dependencies={['oldPassword']}
          rules={[
            {
              required: isInputPassword,
              message: 'Vui lòng nhập nhập mật khẩu mới của bạn!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('oldPassword') !== value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Mật khẩu mới không được trùng mật khẩu cũ!'));
              },
            }),
          ]}
        >
          <Input.Password placeholder={`Mật khẩu mới ${WEBSITE_NAME}`}/>
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
