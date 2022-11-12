import React from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { Form, notification } from 'antd';
import RoleForm from './RoleForm';
import { AdminRolesService } from 'services';

export default function AddEditRoleModal({ open, data, onOk, onCancel }) {
  const [form] = Form.useForm();
  const isEdit = !!data;
  const handleOk = (values) => {
    if (isEdit) {
      AdminRolesService.updateRole(data.id, values, response => {
        notification.success({
          message: "Update role successful!",
        });
        onOk();
      }, error => {
        notification.error({
          message: error && error.title ? error.title : "Update role failure!",
        });
      })
    } else {
      AdminRolesService.createRole(values, response => {
        notification.success({
          message: "Create role successful!",
        });
        onOk();
      }, error => {
        notification.error({
          message: error && error.title ? error.title : "Create role failure!",
        });
      })
    }

  }
  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               form={form}
               open={open}
               title={isEdit ? "Edit role" : "Add role"}
               okText={isEdit ? "Save" : "Add"}
               onOk={handleOk}
               onCancel={onCancel}
    >
      <RoleForm
        form={form}
        initialValues={data}
      />
    </ModalView>
  )
}
