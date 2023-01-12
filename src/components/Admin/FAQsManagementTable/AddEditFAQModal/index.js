import React from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { Form, notification } from 'antd';
import FAQForm from './FAQForm';
import { AdminFAQsService, BaseService } from 'services';

export default function AddEditFAQModal({ open, data, onOk, onCancel }) {
  const [form] = Form.useForm();
  const isEdit = !!data;
  const handleOk = (values) => {
    if (isEdit) {
      AdminFAQsService.updateFAQ(data.id, values, response => {
        notification.success({
          message: "Update FAQ successful!",
        });
        onOk();
      }, error => {
        notification.error({
          message: BaseService.getErrorMessage(error,"Update FAQ failure!" ),
        });
      })
    } else {
      AdminFAQsService.createFAQ(values, response => {
        notification.success({
          message: "Create FAQ successful!",
        });
        onOk();
      }, error => {
        notification.error({
          message: BaseService.getErrorMessage(error, "Create FAQ failure!"),
        });
      })
    }

  }
  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               form={form}
               open={open}
               title={isEdit ? "Edit FAQ" : "Add FAQ"}
               okText={isEdit ? "Save" : "Add"}
               onOk={handleOk}
               onCancel={onCancel}
    >
      <FAQForm
        form={form}
        initialValues={data}
      />
    </ModalView>
  )
}
