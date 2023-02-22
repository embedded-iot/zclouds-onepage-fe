import React from 'react';
import BoxCard from 'components/Share/BoxCard';
import ChangePasswordForm from './ChangePasswordForm';
import { BaseService, SellerUsersService } from 'services';
import { notification } from 'antd';
import { useMediaQuery } from 'react-responsive';
import { RESPONSIVE_MEDIAS } from 'components/contants';

export default function ChangePasswordBox({ currentUser }) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const handOk = values => {
    SellerUsersService.changePassword(values, response => {
      notification.success({
        message: "Change password successful!",
      });
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error,"Change password failure!" ),
      });
    });
  }
  const BoxWrapper = isMobile ? 'div' : BoxCard;
  return (
    <BoxWrapper className={isMobile ? 'box-card--mobile' :'my-account__box'}>
      <ChangePasswordForm onFinish={handOk}/>
    </BoxWrapper>
  )
}
