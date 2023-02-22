import React from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { AdminNotificationsService, BaseService } from 'services';
import { notification } from 'antd';

export default function DeleteNotificationModal({ open, data, onOk, onCancel }) {
  const handleOk = () => {
    AdminNotificationsService.deleteNotification(data.id, response => {
      notification.success({
        message: "Delete notification successful!",
      });
      onOk();
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error, "Delete notification failure!"),
      });
    })
  }
  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               open={open}
               title={"Delete notification"}
               okText={"Delete"}
               onOk={handleOk}
               onCancel={onCancel}
    >
    <div>Delete {data ? data.title : 'Notification title'}</div>
    </ModalView>
  )
}
