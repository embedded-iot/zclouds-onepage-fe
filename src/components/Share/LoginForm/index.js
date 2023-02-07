import React from 'react';
import { Button, Form } from 'antd';
import BoxHeader from 'components/Share/BoxHeader';
import BoxCard from 'components/Share/BoxCard';
import InputPassword , { validatePassword } from 'components/Common/InputPassword';
import InputText from 'components/Common/InputText';
import { getFrontUserUrl } from 'services/BaseService';
import './style.scss';
import { ROUTERS } from 'components/contants';
export default function LoginForm({ onFinish = () => {}, hasBoxCard = true, isAdminMode = false, redirectTo = () => {} }) {
  const BoxWrapper = hasBoxCard ? BoxCard : 'div';
  return (
    <BoxWrapper className="sign-in-form__wrapper" style={{ maxWidth: hasBoxCard && 400 }}>
      <BoxHeader
        title="Sign in to CS Fulfill"
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
          <InputText placeholder="User Name"  />
        </Form.Item>

        <Form.Item
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
        <Form.Item>
          <Button type="primary" size='large' htmlType="submit" className="ant-btn--full-width">
            Log in
          </Button>
        </Form.Item>
        <Form.Item>
          {
            !isAdminMode && (
              <div className="sign-in-form__note">
                Don't have an account? <span className="link" onClick={() => window.open(getFrontUserUrl() + ROUTERS.FRONT_USER_REGISTER, '_self')}>Sign up</span>.
              </div>
            )
          }
          <div className="sign-in-form__note">
            Forgot password? <span className="link" onClick={() => redirectTo(ROUTERS.FORGOT_PASSWORD)}>Here</span>.
          </div>
        </Form.Item>

      </Form>
    </BoxWrapper>
  );
}
