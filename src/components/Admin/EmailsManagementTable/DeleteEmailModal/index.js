import React from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { AdminEmailsService, BaseService } from 'services';
import { notification } from 'antd';

export default function DeleteEmailModal({ open, data, onOk, onCancel }) {
  const handleOk = () => {
    AdminEmailsService.deleteEmail(data.id, response => {
      notification.success({
        message: "Delete email successful!",
      });
      onOk();
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error, "Delete email failure!"),
      });
    })
  }
  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               open={open}
               title={"Delete Email"}
               okText={"Delete"}
               onOk={handleOk}
               onCancel={onCancel}
    >
    <div>Delete {data ? data.email : 'Email'}</div>
    </ModalView>
  )
}
