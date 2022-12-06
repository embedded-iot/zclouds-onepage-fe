import React from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import Icon from 'components/Common/Icon';
import creditIcon from 'images/credit_card_black_icon.svg'

export default function AddMoneyToWalletModal({ open, onCancel }) {
  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               open={open}
               title={<><Icon src={creditIcon} width={24} height={24} /><span>Add money to your wallet</span></>}
               onCancel={onCancel}
               hideOklBtn={true}
    >
      <div>
        Add money to your wallet
      </div>
    </ModalView>
  )
}
