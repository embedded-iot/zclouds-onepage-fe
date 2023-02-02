import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import walletIcon from 'images/wallet_purple_icon.svg';
import bagIcon from 'images/bag_green_icon.svg';
import chartIcon from 'images/column_chart_orange_icon.svg';
import Icon from 'components/Common/Icon';
import { SellerWalletService } from 'services';
import { useMediaQuery } from 'react-responsive';
import { RESPONSIVE_MEDIAS } from 'components/contants';
import './style.scss';

export default function WalletTotalCards() {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
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
    <Row gutter={isMobile ? [0, 8] : [24, 0]}>
      {
        items.map((item, index) => (
          <Col span={isMobile ? 24 : (24 / (items.length))} key={index}>
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
