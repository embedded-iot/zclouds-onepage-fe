import React from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { Form, notification } from 'antd';
import DesignForm from './DesignForm';
import { SellerDesignsService } from 'services';

export default function AddEditDesignModal({ open, data, onOk, onCancel }) {
  const [form] = Form.useForm();
  const isEdit = !!data;
  const handleOk = (values) => {
    if (isEdit) {
      SellerDesignsService.updateDesign(data.id, values, response => {
        notification.success({
          message: "Update design successful!",
        });
        onOk();
      }, error => {
        notification.error({
          message: error && error.title ? error.title : "Update design failure!",
        });
      })
    } else {
      SellerDesignsService.createDesign(values, response => {
        notification.success({
          message: "Create design successful!",
        });
        onOk();
      }, error => {
        notification.error({
          message: error && error.title ? error.title : "Create design failure!",
        });
      })
    }

  }
  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               form={form}
               open={open}
               title={isEdit ? "Edit design" : "Add design"}
               okText={isEdit ? "Save" : "Add"}
               onOk={handleOk}
               onCancel={onCancel}
    >
      <DesignForm
        form={form}
        initialValues={data}
      />
    </ModalView>
  )
}
