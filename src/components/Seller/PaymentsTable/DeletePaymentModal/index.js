import React from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { SellerPaymentsService, BaseService } from 'services';
import { notification } from 'antd';

export default function DeletePaymentModal({ open, data, onOk, onCancel }) {
  const handleOk = () => {
    SellerPaymentsService.deletePayment(data.id, response => {
      notification.success({
        message: "Delete payment successful!",
      });
      onOk();
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error, "Delete payment failure!"),
      });
    })
  }
  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               open={open}
               title={"Delete Payment"}
               okText={"Delete"}
               onOk={handleOk}
               onCancel={onCancel}
    >
    <div>Delete {data ? data.name : 'Payment'}</div>
    </ModalView>
  )
}
