import React from 'react';
import { BaseService, UserService } from 'services';
import { notification } from 'antd';
import { authentication, datetime } from 'utils';
import LoginForm from 'components/Share/LoginForm';
import { ADMIN_ROLES, DATETIME_FORMAT } from 'components/contants';

export default function LoginBox({ setGlobalStore = () => {}, isAdminMode = false, redirectTo = () => {}, onFinish = () => {}}) {
  const getUserInfo = (callback) => {
    UserService.getUserInfo(response => {
      setGlobalStore({
        isLogin: true,
        isAdminMode: ADMIN_ROLES.includes(response.role),
        isAdmin: ADMIN_ROLES.includes(response.role),
        currentUser: {
          ...response,
          convertedLastLogin: datetime.convert(Date(), DATETIME_FORMAT),
        }
      })
      callback();
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error, "Login failure!"),
      });
    })
  }
  const handlerFinish = (values) => {
    UserService.login(values, response => {
      authentication.setToken(response.token);
      getUserInfo(() => {
        notification.success({
          message: "Login successful!",
        });
        onFinish();
      })
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error, "Login failure!"),
      });
    });
  }
  return (
    <LoginForm onFinish={handlerFinish}
               redirectTo={redirectTo}
               isAdminMode={isAdminMode}
    />
  );
}
