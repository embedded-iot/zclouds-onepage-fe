import React from 'react';
import { UserService } from 'services';
import { notification } from 'antd';
import { authentication } from 'utils';
import LoginForm from 'components/Share/LoginForm';
import { ADMIN_ROLES } from 'components/contants';

export default function LoginBox({ setGlobalStore = () => {}, redirectTo = () => {}, onFinish = () => {}}) {
  const getUserInfo = (callback) => {
    UserService.getUserInfo(response => {
      setGlobalStore({
        isLogin: true,
        isAdminMode: ADMIN_ROLES.includes(response.role),
        isAdmin: ADMIN_ROLES.includes(response.role),
        currentUser: {
          ...response
        }
      })
      callback();
    }, error => {
      notification.error({
        message: error && error.title ? error.title : "Login failure!",
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
        message: error && error.title ? error.title : "Login failure!",
      });
    });
  }
  return (
    <LoginForm onFinish={handlerFinish} redirectTo={redirectTo}/>
  );
}
