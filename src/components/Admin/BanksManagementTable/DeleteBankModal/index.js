import React from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { AdminBanksService, BaseService } from 'services';
import { notification } from 'antd';

export default function DeleteBankModal({ open, data, onOk, onCancel }) {
  const handleOk = () => {
    AdminBanksService.deleteBank(data.id, response => {
      notification.success({
        message: "Delete bank successful!",
      });
      onOk();
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error, "Delete bank failure!"),
      });
    })
  }
  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               open={open}
               title={"Delete bank"}
               okText={"Delete"}
               onOk={handleOk}
               onCancel={onCancel}
    >
    <div>Delete {data ? data.bankName : 'Bank name'}</div>
    </ModalView>
  )
}
