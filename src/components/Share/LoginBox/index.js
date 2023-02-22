import React from 'react';
import { BaseService, UserService } from 'services';
import { notification } from 'antd';
import { authentication, datetime } from 'utils';
import LoginForm from 'components/Share/LoginForm';
import { ADMIN_ROLES, DATETIME_FORMAT, ROLE_PERMISSIONS_VALUES } from 'components/contants';

export default function LoginBox({ setGlobalStore = () => {}, isAdminMode = false, hasBoxCard = true, redirectTo = () => {}, onFinish = () => {}}) {
  const getUserInfo = (callback) => {
    UserService.getUserInfo(response => {
      const isAdminRole = ADMIN_ROLES.includes(response.role);
      if (process.env.NODE_ENV === 'production' && isAdminRole !== isAdminMode) {
        authentication.clearToken();
        notification.error({
          message: "Login failure. You can't login the account in this portal!",
        });
        return;
      }
      authentication.setPermissions(ROLE_PERMISSIONS_VALUES[response.role]);
      setGlobalStore({
        isLogin: true,
        isAdminMode: isAdminRole,
        isAdmin: isAdminRole,
        currentUser: {
          ...response,
          convertedLastLogin: datetime.convert(new Date(), DATETIME_FORMAT),
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
               hasBoxCard={hasBoxCard}
    />
  );
}
