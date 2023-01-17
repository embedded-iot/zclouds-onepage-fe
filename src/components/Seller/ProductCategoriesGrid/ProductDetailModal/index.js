import React from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import ProductDetailBox from 'components/FrontUser/ProductDetailBox';

export default function ProductDetailModal({ open, data, redirectTo, onCancel }) {
  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               open={open}
               title={`Product details`}
               onCancel={onCancel}
               hideOklBtn={true}
               maskClosable={true}
               width={1000}
    >
      <ProductDetailBox
        defaultProduct={data}
        redirectTo={redirectTo}
        isAddOrder={false}
      />
    </ModalView>
  )
}
