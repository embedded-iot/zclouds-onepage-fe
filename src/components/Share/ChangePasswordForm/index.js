import React from 'react';
import { Button, Form } from 'antd';
import BoxHeader from 'components/Share/BoxHeader';
import BoxCard from 'components/Share/BoxCard';
import { ROUTERS } from 'components/contants';
import InputPassword , { validatePassword } from 'components/Common/InputPassword';

import './style.scss';


export default function ChangePasswordForm({ onFinish = () => {}, hasBoxCard = true, isAdminMode = false, redirectTo = () => {} }) {
  const BoxWrapper = hasBoxCard ? BoxCard : 'div';
  return (
    <BoxWrapper className="forgot-password-form__wrapper" style={{ maxWidth: hasBoxCard && 400 }}>
      <BoxHeader
        title="Create new password"
      />
      <Form
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
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
        <Form.Item>
          <Button type="primary" size='large' htmlType="submit" className="ant-btn--full-width">
            Change password
          </Button>
        </Form.Item>
        {
          !isAdminMode && (
            <Form.Item>
              <div className="forgot-password-form__note">
                Already have an account? <span className="link" onClick={() => redirectTo(ROUTERS.LOGIN)}>Log In</span>
              </div>
            </Form.Item>
          )
        }
      </Form>
    </BoxWrapper>
  );
}
