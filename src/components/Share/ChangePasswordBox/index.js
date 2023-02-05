import React from 'react';
import { BaseService, UserService } from 'services';
import { notification } from 'antd';
import ChangePasswordForm from 'components/Share/ChangePasswordForm';

export default function ChangePasswordBox({ defaultParams = {}, isAdminMode = false, hasBoxCard = true, redirectTo = () => {}}) {
  const handlerFinish = (values) => {
    const { password } = values;
    const data = {
      password,
      ...defaultParams,
    };
    UserService.changePassword(data, response => {
      notification.success({
        message: "Change password success!",
      });
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error, "Change password failure!"),
      });
    });
  }
  return (
    <ChangePasswordForm
      onFinish={handlerFinish}
      redirectTo={redirectTo}
      isAdminMode={isAdminMode}
      hasBoxCard={hasBoxCard}
    />
  );
}
