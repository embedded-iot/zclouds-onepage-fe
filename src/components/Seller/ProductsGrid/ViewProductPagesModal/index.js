import React from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';

export default function ViewProductPagesModal({ open, data, redirectTo, onCancel }) {
  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               open={open}
               title={`Product details`}
               onCancel={onCancel}
               hideOklBtn={true}
               maskClosable={true}
               width={1000}
    >
      View product pages
    </ModalView>
  )
}
