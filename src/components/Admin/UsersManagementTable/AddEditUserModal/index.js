import React from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { Form, notification } from 'antd';
import UserForm from './UserForm';
import { AdminUsersService } from 'services';

export default function AddEditUserModal({ open, data, onOk, onCancel }) {
  const [form] = Form.useForm();
  const isEdit = !!data;
  const handleOk = (values) => {
    if (isEdit) {
      AdminUsersService.updateUser(data.id, values, response => {
        notification.success({
          message: "Update user successful!",
        });
        onOk();
      }, error => {
        notification.error({
          message: error && error.title ? error.title : "Update user failure!",
        });
      })
    } else {
      AdminUsersService.createUser(values, response => {
        notification.success({
          message: "Create user successful!",
        });
        onOk();
      }, error => {
        notification.error({
          message: error && error.title ? error.title : "Create user failure!",
        });
      })
    }

  }
  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               form={form}
               open={open}
               title={isEdit ? "Edit user" : "Add user"}
               okText={isEdit ? "Save" : "Add"}
               onOk={handleOk}
               onCancel={onCancel}
    >
      <UserForm
        form={form}
        initialValues={data}
      />
    </ModalView>
  )
}
