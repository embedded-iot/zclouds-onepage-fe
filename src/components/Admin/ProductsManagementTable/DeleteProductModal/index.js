import React from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';

export default function DeleteProductModal({ open, data, onOk, onCancel }) {
  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               open={open}
               title={"Delete product"}
               okText={"Delete"}
               onOk={onOk}
               onCancel={onCancel}
    >
    <div>Delete {data ? data.name : 'Product name'}</div>
    </ModalView>
  )
}
