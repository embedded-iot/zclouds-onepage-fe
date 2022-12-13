import React from 'react';
import { Form, notification } from 'antd';
import UserForm from './UserForm';
import { AdminUsersService, BaseService } from 'services';

export default function AddEditUserBox({ data, role, onOk }) {
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
          message: BaseService.getErrorMessage(error,"Update user failure!"),
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
          message: BaseService.getErrorMessage(error,"Create user failure!" ),
        });
      })
    }

  }
  return (
    <UserForm
      form={form}
      isEdit={isEdit}
      role={role}
      initialValues={data}
      onFinish={handleOk}
    />
  )
}
