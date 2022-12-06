import React from 'react';
import BoxCard from 'components/Share/BoxCard';
import PersonalInformationForm from './PersonalInformationForm';
import { BaseService, UserService } from 'services';
import { notification } from 'antd';

export default function PersonalInformationBox({ currentUser }) {
  const handOk = values => {
    UserService.changeUserInfo(values, response => {
      notification.success({
        message: "Update personal information successful!",
      });
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error,"Update personal information failure!" ),
      });
    });
  }
  return (
    <BoxCard className="my-account__box">
      <PersonalInformationForm onFinish={handOk}
                               initialValues={currentUser}
      />
    </BoxCard>
  )
}
