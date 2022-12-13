import React from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { AdminUsersService, BaseService } from 'services';
import { notification } from 'antd';
import { ROLE_LABELS } from 'components/contants';

export default function DeleteUserModal({ open, data, onOk, onCancel }) {
  const roleLabel =  ROLE_LABELS[data.role] || data.role || 'User';
  const handleOk = () => {
    AdminUsersService.deleteUser(data.id, response => {
      notification.success({
        message: `Delete ${roleLabel} successful!`,
      });
      onOk();
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error,`Delete ${roleLabel} failure!`),
      });
    })
  }
  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               open={open}
               title={`Delete ${roleLabel}`}
               okText={"Delete"}
               onOk={handleOk}
               onCancel={onCancel}
    >
    <div>Delete {data ? data.username : 'User name'}</div>
    </ModalView>
  )
}
