import React from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { Form, notification } from 'antd';
import BankForm from './BankForm';
import { AdminBanksService, BaseService } from 'services';

export default function AddEditBankModal({ open, data, onOk, onCancel }) {
  const [form] = Form.useForm();
  const isEdit = !!data;
  const handleOk = (values) => {
    if (isEdit) {
      AdminBanksService.updateBank(data.id, values, response => {
        notification.success({
          message: "Update bank successful!",
        });
        onOk();
      }, error => {
        notification.error({
          message: BaseService.getErrorMessage(error,"Update bank failure!" ),
        });
      })
    } else {
      AdminBanksService.createBank(values, response => {
        notification.success({
          message: "Create bank successful!",
        });
        onOk();
      }, error => {
        notification.error({
          message: BaseService.getErrorMessage(error, "Create bank failure!"),
        });
      })
    }

  }
  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               form={form}
               open={open}
               title={isEdit ? "Edit bank" : "Add bank"}
               okText={isEdit ? "Save" : "Add"}
               onOk={handleOk}
               onCancel={onCancel}
    >
      <BankForm
        form={form}
        initialValues={data}
      />
    </ModalView>
  )
}
