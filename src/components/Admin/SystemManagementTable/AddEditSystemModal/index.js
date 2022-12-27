import React from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { Form, notification } from 'antd';
import SystemForm from './SystemForm';
import { AdminSystemService, BaseService } from 'services';

export default function AddEditSystemModal({ open, data, onOk, onCancel }) {
  const [form] = Form.useForm();
  const isEdit = !!data;
  const handleOk = (values) => {
    if (isEdit) {
      AdminSystemService.updateSystem(data.id, values, response => {
        notification.success({
          message: "Update system config successful!",
        });
        onOk();
      }, error => {
        notification.error({
          message: BaseService.getErrorMessage(error,"Update system config failure!" ),
        });
      })
    } else {
      AdminSystemService.createSystem(values, response => {
        notification.success({
          message: "Create system config successful!",
        });
        onOk();
      }, error => {
        notification.error({
          message: BaseService.getErrorMessage(error, "Create system config failure!"),
        });
      })
    }

  }
  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               form={form}
               open={open}
               title={isEdit ? "Edit system config" : "Add system config"}
               okText={isEdit ? "Save" : "Add"}
               onOk={handleOk}
               onCancel={onCancel}
    >
      <SystemForm
        form={form}
        initialValues={data}
      />
    </ModalView>
  )
}
