import React from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { SellerDomainsService, BaseService } from 'services';
import { notification } from 'antd';

export default function DeleteDomainModal({ open, data, onOk, onCancel }) {
  const handleOk = () => {
    SellerDomainsService.deleteDomain(data.id, response => {
      notification.success({
        message: "Delete domain successful!",
      });
      onOk();
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error, "Delete domain failure!"),
      });
    })
  }
  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               open={open}
               title={"Delete Domain"}
               okText={"Delete"}
               onOk={handleOk}
               onCancel={onCancel}
    >
    <div>Delete {data ? data.domain : 'Domain'}</div>
    </ModalView>
  )
}
