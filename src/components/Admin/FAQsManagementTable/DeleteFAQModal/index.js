import React from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { AdminFAQsService, BaseService } from 'services';
import { notification } from 'antd';

export default function DeleteFAQModal({ open, data, onOk, onCancel }) {
  const handleOk = () => {
    AdminFAQsService.deleteFAQ(data.id, response => {
      notification.success({
        message: "Delete FAQ successful!",
      });
      onOk();
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error, "Delete FAQ failure!"),
      });
    })
  }
  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               open={open}
               title={"Delete FAQ"}
               okText={"Delete"}
               onOk={handleOk}
               onCancel={onCancel}
    >
    <div>Delete {data ? data.title : 'FAQ title'}</div>
    </ModalView>
  )
}
