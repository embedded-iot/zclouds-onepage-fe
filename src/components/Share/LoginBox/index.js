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
          ...response
        }
      })
      callback();
    }, error => {
      notification.error({
        message: error.title || "Không thể lấy thông tin tài khoản bây giờ. Vui lòng thử lại sau!",
      });
    })
  }
  const handlerFinish = (values) => {
    setGlobalStore({
      isLogin: true,
      isAdmin: process.env.REACT_APP_ADMIN_MODE === 'true',
    })
    notification.success({
      message: "Đăng nhập thành công!",
    });
    onFinish();
    return;
    // eslint-disable-next-line
    UserService.login(values, response => {
      authentication.setToken(response.id_token);
      getUserInfo(() => {
        notification.success({
          message: "Đăng nhập thành công!",
        });
        onFinish();
      })
    }, error => {
      notification.error({
        message: error.title || "Tên đăng nhập hoặc mật khẩu không đúng."
      });
    });
  }
  return (
    <LoginForm onFinish={handlerFinish} redirectTo={redirectTo}/>
  );
}
