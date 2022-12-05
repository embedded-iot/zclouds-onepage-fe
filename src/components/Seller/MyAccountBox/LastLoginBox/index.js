import React from 'react';
import BoxCard from 'components/Share/BoxCard';
import Icon from 'components/Common/Icon';
import settingIcon from 'images/setting-icon.svg';
import { Card } from 'antd';

export default function LastLoginBox() {
  return (
    <BoxCard className="my-account__box">
      <Card title={<><Icon src={settingIcon} width={24} height={24} /> Last login</>}
            className="my-account__card"
            bordered={false}>
        Last login: 2022-11-16 19:30
      </Card>
    </BoxCard>
  )
}
