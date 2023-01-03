import React from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { Form, notification } from 'antd';
import NotificationForm from './NotificationForm';
import { AdminNotificationsService, BaseService } from 'services';

export default function AddEditNotificationModal({ open, data, onOk, onCancel }) {
  const [form] = Form.useForm();
  const isEdit = !!data;
  const handleOk = (values) => {
    if (isEdit) {
      AdminNotificationsService.updateNotification(data.id, values, response => {
        notification.success({
          message: "Update notification successful!",
        });
        onOk();
      }, error => {
        notification.error({
          message: BaseService.getErrorMessage(error,"Update notification failure!" ),
        });
      })
    } else {
      AdminNotificationsService.createNotification(values, response => {
        notification.success({
          message: "Create notification successful!",
        });
        onOk();
      }, error => {
        notification.error({
          message: BaseService.getErrorMessage(error, "Create notification failure!"),
        });
      })
    }

  }
  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               form={form}
               open={open}
               title={isEdit ? "Edit notification" : "Add notification"}
               okText={isEdit ? "Save" : "Add"}
               onOk={handleOk}
               onCancel={onCancel}
    >
      <NotificationForm
        form={form}
        initialValues={data}
      />
    </ModalView>
  )
}
