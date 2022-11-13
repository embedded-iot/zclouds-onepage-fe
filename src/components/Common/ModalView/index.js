import React from 'react';
import { Modal } from 'antd';

export const MODAL_TYPES = {
  FULL_MODAL: 'FULL_MODAL',
  CONFIRM_MODAL: 'CONFIRM_MODAL',
}

export default function ModalView({ type = MODAL_TYPES.CONFIRM_MODAL, open, form, children, title, okText, cancelText, onCancel, onOk, ...restProps }) {
  return (
    <Modal
      open={open}
      title={title}
      centered
      okText={okText || "Ok"}
      cancelText={ cancelText || "Cancel"}
      onCancel={onCancel}
      width={612}
      onOk={() => {
        if (!form) {
          onOk();
          return;
        }
        form
          .validateFields()
          .then((values) => {
            // form.resetFields();
            onOk(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
      { ...restProps }
    >
      {
        children
      }
    </Modal>
  );
}
