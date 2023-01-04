import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import walletIcon from 'images/wallet_purple_icon.svg';
import bagIcon from 'images/bag_green_icon.svg';
import chartIcon from 'images/column_chart_orange_icon.svg';
import Icon from 'components/Common/Icon';
import { SellerWalletService } from 'services';
import './style.scss';

export default function WalletTotalCards() {
  const [data, setData] = useState({});
  const getWalletTotal = (params = {}) => {
    SellerWalletService.getWalletTotal(response => {
      setData(response);
    });
  }

  useEffect(() => {
    getWalletTotal();
    // eslint-disable-next-line
  }, []);

  const items = [
    {
      label: 'Wallet total (1)',
      value: data.convertedWalletTotal,
      icon: walletIcon,
      leftBorderColor: '#8270DB',
    },
    {
      label: 'Orders total (2)',
      value: data.convertedOrdersTotal,
      icon: bagIcon,
      leftBorderColor: '#22A06B',
    },
    {
      label: 'Your Balance (1-2)',
      value: data.convertedYourBalance,
      icon: chartIcon,
      leftBorderColor: '#D97008',
    }
  ]
  return (
    <Row gutter={[24, 24]}>
      {
        items.map((item, index) => (
          <Col span={24 / (items.length)} key={index}>
            <div className="wallet-total__card">
              <div className='wallet-total__left-border' style={{background: item.leftBorderColor }}></div>
              <div className='wallet-total__contents'>
                <div className='wallet-total__label'>{item.label}</div>
                <div className='wallet-total__value'>{item.value}</div>
              </div>
              <Icon src={item.icon} width={32} height={32} />
            </div>
          </Col>
        ))
      }
    </Row>
  )
}
