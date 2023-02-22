import React from 'react';
import { BaseService, UserService } from 'services';
import { notification } from 'antd';
import ForgotPasswordForm from 'components/Share/ForgotPasswordForm';

export default function ForgotPasswordBox({ isAdminMode = false, hasBoxCard = true, redirectTo = () => {}}) {
  const handlerFinish = (values) => {
    UserService.forgotPassword(values, response => {
      notification.success({
        message: "Please check your email!",
      });
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error, "Forgot password failure!"),
      });
    });
  }
  return (
    <ForgotPasswordForm
      onFinish={handlerFinish}
      redirectTo={redirectTo}
      isAdminMode={isAdminMode}
      hasBoxCard={hasBoxCard}
    />
  );
}
