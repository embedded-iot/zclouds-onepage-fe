import React from 'react';
import { BaseService, SellerUsersService } from 'services';
import { notification } from 'antd';
import AirwallexForm from './AirwallexForm';
import { useMediaQuery } from 'react-responsive';
import { RESPONSIVE_MEDIAS } from 'components/contants';
import BoxCard from 'components/Share/BoxCard';

export default function AddAirwallexBox() {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const BoxWrapper = isMobile ? 'div' : BoxCard;

  const handlerFinish = (values) => {
    SellerUsersService.changeUserInfo(values, response => {
      notification.success({
        message: "Add airwallex payment success!",
      });
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error, "Add airwallex payment failure!"),
      });
    });
  }

  return (
    <BoxWrapper className={!isMobile && 'content-box__wrapper'} >
      <BoxWrapper className={`no-margin ${!isMobile && 'card-box__wrapper'}`}>
        <div className='general-setting-box__wrapper'>
          <AirwallexForm
            onFinish={handlerFinish}
          />
        </div>
      </BoxWrapper>
    </BoxWrapper>
  )
}
