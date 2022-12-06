import React, { useEffect } from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import Icon from 'components/Common/Icon';
import creditIcon from 'images/credit_card_black_icon.svg'
import { SellerWalletService } from 'services';

import './style.scss';
import TabsBox from 'components/Common/TabsBox';

export default function AddMoneyToWalletModal({ open, onCancel }) {
  useEffect(() => {
    SellerWalletService.getWalletMethods(response => {

    })
  }, []);

  const items = [
    {
      label: `Tab 1`,
      key: '1',
      children: `Content of Tab Pane 1`,
    },
    {
      label: `Tab 2`,
      key: '2',
      children: `Content of Tab Pane 2`,
    },
    {
      label: `Tab 3`,
      key: '3',
      children: `Content of Tab Pane 3`,
    },
  ]

  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               open={open}
               title={<><Icon src={creditIcon} width={24} height={24} /><span>Add money to your wallet</span></>}
               onCancel={onCancel}
               hideOklBtn={true}
    >
      <div>
        <div className="add-money-to-wallet__min-top-up">Min top up: <span className="add-money-to-wallet__currency">$13,498.14</span> (Rate: 25.000 ₫) ⟺ <span className="add-money-to-wallet__currency">337.453.500 ₫</span></div>
        <TabsBox items={items} />
      </div>
    </ModalView>
  )
}
