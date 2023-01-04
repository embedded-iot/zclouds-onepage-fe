import React, { useEffect, useState } from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import Icon from 'components/Common/Icon';
import creditIcon from 'images/credit_card_black_icon.svg'
import { SellerBanksService, SellerSystemService } from 'services';

import './style.scss';
import TabsBox from 'components/Common/TabsBox';
import { Col, Row } from 'antd';
import { cui, format } from 'utils';
import { SYSTEM_CONFIG_VALUE } from 'components/contants';

export default function AddMoneyToWalletModal({ open, systemConfigs = [], onCancel }) {
  const [walletMethodsItems, setWalletMethodsItems] = useState([]);
  useEffect(() => {
    SellerBanksService.getBanksInfo(response => {
      setWalletMethodsItems(SellerBanksService.getGroupedBanks(response || []));
    })
  }, []);
  const items = walletMethodsItems.map(item => ({
    label: item.name,
    key: item.id,
    children: (
      <Row gutter={[24, 24]}>
        {
          item.children.map(item => (
            <Col span={12} key={item.id} className="add-money-to-wallet__bank-info">
              <div className='add-money-to-wallet__bank-name'>{cui.toCapitalizeCase(`${item.bankType} Name`)}: {item.bankName}</div>
              <div className='add-money-to-wallet__account-name'>Account Name: {item.accountName}</div>
              <div className='add-money-to-wallet__account-number'>Account Number: {item.accountNumber}</div>
              <div className='add-money-to-wallet__transfer-content'>Transfer content: <span className="value">{item.transferContent}</span></div>
              <div className='add-money-to-wallet__transfer-note'>Enter the exact content of the transfer</div>
            </Col>
          ))
        }
      </Row>
    )
  }))

  const minTopUp = +(SellerSystemService.getSystemConfigValue(systemConfigs, SYSTEM_CONFIG_VALUE.MIN_TOP_UP) || '0');
  const rate = +(SellerSystemService.getSystemConfigValue(systemConfigs, SYSTEM_CONFIG_VALUE.RATE) || '0');
  const convertedMinTopUp = format.formatCurrency(minTopUp);
  const convertedRate = format.formatCurrency(rate, 'VND');
  const minVNDTopUp = minTopUp * rate;
  const convertedVNDMinTopUp = format.formatCurrency(minVNDTopUp, 'VND');
  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               open={open}
               title={<><Icon src={creditIcon} width={24} height={24} /><span>Add money to your wallet</span></>}
               onCancel={onCancel}
               hideOklBtn={true}
               width={884}
    >
      <>
        <div className="add-money-to-wallet__min-top-up margin-button-16">
          { !!minTopUp && <span>Min top up: <span className="add-money-to-wallet__currency">{convertedMinTopUp}</span></span> }
          { !!rate && <span>{` (Rate: ${convertedRate}`})</span>}
          { !!minVNDTopUp && <span> ⟺ <span className="add-money-to-wallet__currency">{convertedVNDMinTopUp}</span></span>}
          </div>
        { !!items.length && <TabsBox items={items} /> }
      </>
    </ModalView>
  )
}
