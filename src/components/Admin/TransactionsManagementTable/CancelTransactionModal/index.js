import React from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { AdminTransactionsService, BaseService } from 'services';
import { Form, notification } from 'antd';
import RejectTransactionForm from './RejectTransactionForm';
import { STATE_VALUES } from 'components/contants';

export default function CancelTransactionModal({ open, data, onOk, onCancel }) {
  const [form] = Form.useForm();
  const handleOk = (values) => {
    const { description = '' } = values;
    const transactionData = {
      status: STATE_VALUES.REJECTED,
      description,
    }
    AdminTransactionsService.updateTransactionStatus(data.id, transactionData, response => {
      notification.success({
        message: "Reject transaction successful!",
      });
      onOk();
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error,"Reject transaction failure!"),
      });
    })
  }
  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               open={open}
               form={form}
               title={"Reject transaction"}
               okText={"Save"}
               onOk={handleOk}
               onCancel={onCancel}
    >
      <RejectTransactionForm form={form}
                             initialValues={data}
      />
    </ModalView>
  )
}
