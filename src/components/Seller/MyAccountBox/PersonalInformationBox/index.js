import React from 'react';
import BoxCard from 'components/Share/BoxCard';
import PersonalInformationForm from './PersonalInformationForm';
import { BaseService, SellerUsersService, UserService } from 'services';
import { notification } from 'antd';

export default function PersonalInformationBox({ currentUser, onChange }) {
  const handOk = values => {
    const { fullName, telegramId, email, phone, imageFiles } = values;
    const avatar = !!imageFiles.length ? imageFiles[0].response.url : null;
    SellerUsersService.changeUserInfo({ fullName, telegramId, email, phone, avatar } , response => {
      onChange(UserService.transformUser(response));
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
