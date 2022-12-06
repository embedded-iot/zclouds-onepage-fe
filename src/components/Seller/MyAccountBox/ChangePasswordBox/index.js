import React from 'react';
import BoxCard from 'components/Share/BoxCard';
import ChangePasswordForm from './ChangePasswordForm';
import { BaseService, UserService } from 'services';
import { notification } from 'antd';

export default function ChangePasswordBox({ currentUser }) {
  const handOk = values => {
    UserService.changePassword(values, response => {
      notification.success({
        message: "Change password successful!",
      });
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error,"Change password failure!" ),
      });
    });
  }
  return (
    <BoxCard className="my-account__box">
      <ChangePasswordForm onFinish={handOk}/>
    </BoxCard>
  )
}
