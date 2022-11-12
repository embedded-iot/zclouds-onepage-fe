import React from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { AdminRolesService } from 'services';
import { notification } from 'antd';

export default function DeleteRoleModal({ open, data, onOk, onCancel }) {
  const handleOk = () => {
    AdminRolesService.deleteRole(data.id, response => {
      notification.success({
        message: "Delete role successful!",
      });
      onOk();
    }, error => {
      notification.error({
        message: error && error.title ? error.title : "Delete role failure!",
      });
    })
  }
  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               open={open}
               title={"Delete role"}
               okText={"Delete"}
               onOk={handleOk}
               onCancel={onCancel}
    >
    <div>Delete {data ? data.name : 'Role name'}</div>
    </ModalView>
  )
}
