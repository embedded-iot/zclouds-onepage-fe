import React from 'react';
import BoxCard from 'components/Share/BoxCard';
import Icon from 'components/Common/Icon';
import timeIcon from 'images/time_black_icon.svg';
import { Card } from 'antd';

export default function LastLoginBox({ currentUser }) {
  return (
    <BoxCard className="my-account__box">
      <Card title={<div className="my-account__card-title"><Icon src={timeIcon} width={24} height={24} /> Last login</div>}
            className="my-account__card"
            bordered={false}>
        Last login: {currentUser.convertedLastLogin}
      </Card>
    </BoxCard>
  )
}
