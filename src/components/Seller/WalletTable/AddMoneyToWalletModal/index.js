import React, { useEffect, useState } from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import Icon from 'components/Common/Icon';
import creditIcon from 'images/credit_card_black_icon.svg'
import { SellerWalletService } from 'services';

import './style.scss';
import TabsBox from 'components/Common/TabsBox';
import { Col, Row } from 'antd';

export default function AddMoneyToWalletModal({ open, onCancel }) {
  const [walletMethodsItems, setWalletMethodsItems] = useState([]);
  useEffect(() => {
    SellerWalletService.getWalletMethods(response => {
      setWalletMethodsItems(response.walletMethods ? response.walletMethods : []);
    })
  }, []);

  const items = walletMethodsItems.map(item => ({
    label: item.name,
    key: item.id,
    children: (
      <Row gutter={[24, 24]}>
        {
          item.methods.map(method => (
            <Col span={12}>
              {method}
            </Col>
          ))
        }
      </Row>
    )
  }))

  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               open={open}
               title={<><Icon src={creditIcon} width={24} height={24} /><span>Add money to your wallet</span></>}
               onCancel={onCancel}
               hideOklBtn={true}
               width={884}
    >
      <>
        <div className="add-money-to-wallet__min-top-up margin-button-16">Min top up: <span className="add-money-to-wallet__currency">$13,498.14</span> (Rate: 25.000 ₫) ⟺ <span className="add-money-to-wallet__currency">337.453.500 ₫</span></div>
        <TabsBox items={items}/>
      </>
    </ModalView>
  )
}
