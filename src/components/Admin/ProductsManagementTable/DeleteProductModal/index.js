import React from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { AdminProductsService, BaseService } from 'services';
import { notification } from 'antd';

export default function DeleteProductModal({ open, data, onOk, onCancel }) {
  const handleOk = () => {
    AdminProductsService.deleteProduct(data.id, response => {
      notification.success({
        message: "Delete product successful!",
      });
      onOk();
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error,"Delete product failure!"),
      });
    })
  }
  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               open={open}
               title={"Delete product"}
               okText={"Delete"}
               onOk={handleOk}
               onCancel={onCancel}
    >
    <div>Delete {data ? data.name : 'Product name'}</div>
    </ModalView>
  )
}
