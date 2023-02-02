import React from 'react';
import BoxCard from 'components/Share/BoxCard';
import Icon from 'components/Common/Icon';
import timeIcon from 'images/time_black_icon.svg';
import { Card } from 'antd';
import { useMediaQuery } from 'react-responsive';
import { RESPONSIVE_MEDIAS } from 'components/contants';

export default function LastLoginBox({ currentUser }) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const BoxWrapper = isMobile ? 'div' : BoxCard;
  return (
    <BoxWrapper className={isMobile ? 'box-card--mobile' :'my-account__box'}>
      <Card title={<div className="my-account__card-title"><Icon src={timeIcon} width={24} height={24} /> Last login</div>}
            className="my-account__card"
            bordered={false}>
        Last login: {currentUser.convertedLastLogin}
      </Card>
    </BoxWrapper>
  )
}
