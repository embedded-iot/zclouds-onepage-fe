import React from 'react';
import { Button, Form } from 'antd';
import BoxHeader from 'components/Share/BoxHeader';
import BoxCard from 'components/Share/BoxCard';
import InputText from 'components/Common/InputText';
import { ROUTERS } from 'components/contants';

import './style.scss';


export default function ForgotPasswordForm({ onFinish = () => {}, hasBoxCard = true, isAdminMode = false, redirectTo = () => {} }) {
  const BoxWrapper = hasBoxCard ? BoxCard : 'div';
  return (
    <BoxWrapper className="forgot-password-form__wrapper" style={{ width: hasBoxCard && 400 }}>
      <BoxHeader
        title="Reset Your Password"
        description="Lost your password? Please enter your email address. You will receive a link to create a new password via email."
      />
      <Form
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Email"
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
        <Form.Item>
          <Button type="primary" size='large' htmlType="submit" className="ant-btn--full-width">
            Reset password
          </Button>
        </Form.Item>
        {
          !isAdminMode && (
            <Form.Item>
              <div className="forgot-password-form__note">
                Don't have an account? <span className="link" onClick={() => redirectTo(ROUTERS.REGISTER)}>Sign up</span>.
              </div>
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
