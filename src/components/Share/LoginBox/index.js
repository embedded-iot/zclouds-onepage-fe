import React from 'react';
import { UserService } from 'services';
import { notification } from 'antd';
import { authentication } from 'utils';
import LoginForm from 'components/Share/LoginForm';

export default function LoginBox({ setGlobalStore = () => {}, redirectTo = () => {}, onFinish = () => {}}) {
  const getUserInfo = (callback) => {
    UserService.getUserInfo(response => {
      setGlobalStore({
        isLogin: true,
        isAdmin: false,
        currentUser: {
          ...response.data
        }
      })
      callback();
    }, error => {
      notification.error({
        message: error.status && error.status.message ? error.status.message : "Không thể lấy thông tin tài khoản bây giờ. Vui lòng thử lại sau!",
      });
    })
  }
  const handlerFinish = (values) => {
    UserService.login(values, response => {
      authentication.setToken(response.data.token);
      getUserInfo(() => {
        notification.success({
          message: "Đăng nhập thành công!",
        });
        onFinish();
      })
    }, error => {
      notification.error({
        message: error.status && error.status.message ? error.status.message : "Không thể đăng nhập tài khoản bây giờ. Vui lòng thử lại sau!",
      });
    });
  }
  return (
    <LoginForm onFinish={handlerFinish} redirectTo={redirectTo}/>
  );
}
