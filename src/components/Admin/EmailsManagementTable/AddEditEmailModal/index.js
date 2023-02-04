import React from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { Form, notification } from 'antd';
import EmailForm from './EmailForm';
import { AdminEmailsService, BaseService } from 'services';

export default function AddEditEmailModal({ open, data, onOk, onCancel }) {
  const [form] = Form.useForm();
  const isEdit = !!data;
  const handleOk = (values) => {
    if (isEdit) {
      AdminEmailsService.updateEmail(data.id, values, response => {
        notification.success({
          message: "Update Email successful!",
        });
        onOk();
      }, error => {
        notification.error({
          message: BaseService.getErrorMessage(error,"Update Email failure!" ),
        });
      })
    } else {
      AdminEmailsService.createEmail(values, response => {
        notification.success({
          message: "Create Email successful!",
        });
        onOk();
      }, error => {
        notification.error({
          message: BaseService.getErrorMessage(error, "Create Email failure!"),
        });
      })
    }

  }
  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               form={form}
               open={open}
               title={isEdit ? "Edit Email" : "Add Email"}
               okText={isEdit ? "Save" : "Add"}
               onOk={handleOk}
               onCancel={onCancel}
    >
      <EmailForm
        form={form}
        initialValues={data}
      />
    </ModalView>
  )
}
