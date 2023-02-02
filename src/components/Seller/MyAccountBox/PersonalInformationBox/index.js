import React from 'react';
import BoxCard from 'components/Share/BoxCard';
import PersonalInformationForm from './PersonalInformationForm';
import { BaseService, SellerUsersService, UserService } from 'services';
import { notification } from 'antd';
import { useMediaQuery } from 'react-responsive';
import { RESPONSIVE_MEDIAS } from 'components/contants';

export default function PersonalInformationBox({ currentUser, onChange }) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
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
  const BoxWrapper = isMobile ? 'div' : BoxCard;
  return (
    <BoxWrapper className={isMobile ? 'box-card--mobile' :'my-account__box'}>
      <PersonalInformationForm onFinish={handOk}
                               initialValues={currentUser}
      />
    </BoxWrapper>
  )
}
