import React from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { BaseService, SellerDesignsService } from 'services';
import { notification } from 'antd';

export default function DeleteDesignModal({ open, data, onOk, onCancel }) {
  const handleOk = () => {
    SellerDesignsService.deleteDesign(data.id, response => {
      notification.success({
        message: "Delete design successful!",
      });
      onOk();
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error,"Delete design failure!"),
      });
    })
  }
  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               open={open}
               title={"Delete design"}
               okText={"Delete"}
               onOk={handleOk}
               onCancel={onCancel}
    >
    <div>Delete {data ? data.name : 'Design name'}</div>
    </ModalView>
  )
}
