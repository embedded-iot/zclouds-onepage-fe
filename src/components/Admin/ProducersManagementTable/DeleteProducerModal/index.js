import React from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { AdminProducersService, BaseService } from 'services';
import { notification } from 'antd';

export default function DeleteProducerModal({ open, data, onOk, onCancel }) {
  const handleOk = () => {
    AdminProducersService.deleteProducer(data.id, response => {
      notification.success({
        message: "Delete producer successful!",
      });
      onOk();
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error, "Delete producer failure!"),
      });
    })
  }
  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               open={open}
               title={"Delete producer"}
               okText={"Delete"}
               onOk={handleOk}
               onCancel={onCancel}
    >
    <div>Delete {data ? data.name : 'Producer name'}</div>
    </ModalView>
  )
}
