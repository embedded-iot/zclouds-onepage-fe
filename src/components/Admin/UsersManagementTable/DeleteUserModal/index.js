import React from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { AdminUsersService, BaseService } from 'services';
import { notification } from 'antd';

export default function DeleteUserModal({ open, data, onOk, onCancel }) {
  const handleOk = () => {
    AdminUsersService.deleteUser(data.id, response => {
      notification.success({
        message: "Delete user successful!",
      });
      onOk();
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error,"Delete user failure!"),
      });
    })
  }
  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               open={open}
               title={"Delete user"}
               okText={"Delete"}
               onOk={handleOk}
               onCancel={onCancel}
    >
    <div>Delete {data ? data.name : 'User name'}</div>
    </ModalView>
  )
}
