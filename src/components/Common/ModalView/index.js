import React from 'react';
import { Modal } from 'antd';

import './style.scss';

export const MODAL_TYPES = {
  FULL_MODAL: 'FULL_MODAL',
  CONFIRM_MODAL: 'CONFIRM_MODAL',
}

export default function ModalView({ type = MODAL_TYPES.CONFIRM_MODAL, open, form, children, title, hideCancelBtn = false, hideOklBtn = false, okText, cancelText, onCancel, onOk, ...restProps }) {
  return (
    <Modal
      open={open}
      title={title}
      centered
      wrapClassName="modal-view__container"
      okText={okText || "Ok"}
      cancelText={ cancelText || "Cancel"}
      onCancel={onCancel}
      width={612}
      okButtonProps={{
        style: {
          display: hideOklBtn && 'none'
        }
      }}
      cancelButtonProps={{
        style: {
          display: hideCancelBtn && 'none'
        }
      }}
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
