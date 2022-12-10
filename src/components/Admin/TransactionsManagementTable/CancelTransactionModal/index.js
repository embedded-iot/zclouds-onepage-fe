import React from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { AdminTransactionsService, BaseService } from 'services';
import { notification } from 'antd';

export default function CancelTransactionModal({ open, data, onOk, onCancel }) {
  const handleOk = () => {
    AdminTransactionsService.cancelTransaction(data.id, response => {
      notification.success({
        message: "Cancel transaction successful!",
      });
      onOk();
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error,"Cancel transaction failure!"),
      });
    })
  }
  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               open={open}
               title={"Cancel transaction"}
               okText={"Save"}
               onOk={handleOk}
               onCancel={onCancel}
    >
    <div>Cancel transaction: {data ? data.id : 'Transaction id'}</div>
    </ModalView>
  )
}
