import React from 'react';
import { Form } from 'antd';
import InputPassword , { validatePassword } from 'components/Common/InputPassword';
import BoxHeader from 'components/Share/BoxHeader';


export default function UserSettingForm({ onFinish = () => {}, hasBoxCard = true, isAdminMode = false, redirectTo = () => {} }) {
  return (
    <Form
      name="basic"
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
    >
      <Form.Item>
        <BoxHeader
          title="Create new password"
          align="left"
        />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please enter password!',
          },
          validatePassword
        ]}
      >
        <InputPassword placeholder="Password" />
      </Form.Item>
      <Form.Item
        label="Confirm Password"
        name="confirmPassword"
        rules={[
          {
            required: true,
            message: 'Please enter password again!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || value === getFieldValue('password')) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Confirm password is not matching!'));
            },
          }),
          validatePassword
        ]}
      >
        <InputPassword placeholder="Confirm password" />
      </Form.Item>

    </Form>
  );
}
