import React from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';

export default function AddProductPageModal({ open, data, onOk, onCancel }) {
  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               open={open}
               title={`Creating product page`}
               onOk={onOk}
               onCancel={onCancel}
               okText='Create'
    >
      Are you sure you want to create product page from <b>{data && data.title}</b> ?
    </ModalView>
  )
}
