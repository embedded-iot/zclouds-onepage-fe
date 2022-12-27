import React from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { AdminSystemService, BaseService } from 'services';
import { notification } from 'antd';

export default function DeleteSystemModal({ open, data, onOk, onCancel }) {
  const handleOk = () => {
    AdminSystemService.deleteSystem(data.id, response => {
      notification.success({
        message: "Delete system config successful!",
      });
      onOk();
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error, "Delete system config failure!"),
      });
    })
  }
  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               open={open}
               title={"Delete system config"}
               okText={"Delete"}
               onOk={handleOk}
               onCancel={onCancel}
    >
    <div>Delete {data ? data.configName : 'Config name'}</div>
    </ModalView>
  )
}
