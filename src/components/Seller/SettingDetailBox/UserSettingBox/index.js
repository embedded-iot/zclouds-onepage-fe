import React from 'react';
import { BaseService, UserService } from 'services';
import { notification } from 'antd';
import UserSettingForm from './UserSettingForm';

export default function UserSettingBox() {
  const handlerFinish = (values) => {
    const { password: newPassword, name, timeZone } = values;
    const data = {
      newPassword,
      name,
      timeZone,
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
    <div className='user-setting-box__wrapper'>
      <UserSettingForm
        onFinish={handlerFinish}
      />
    </div>
  )
}
