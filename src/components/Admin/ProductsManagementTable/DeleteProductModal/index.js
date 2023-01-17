import React from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { AdminProductsService, BaseService } from 'services';
import { notification } from 'antd';

export default function DeleteProductModal({ open, data, productIds = [], onOk, onCancel }) {
  const handleOk = () => {
    if (productIds.length === 1) {
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
    } else {
      AdminProductsService.deleteProducts({ productIds }, response => {
        notification.success({
          message: "Delete products successful!",
        });
        onOk();
      }, error => {
        notification.error({
          message: BaseService.getErrorMessage(error,"Delete products failure!"),
        });
      })
    }
  }
  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               open={open}
               title={`Delete product${productIds.length > 1 ? 's' : ''}`}
               okText={"Delete"}
               onOk={handleOk}
               onCancel={onCancel}
    >
    <div>Delete {productIds.length === 1 ? data.name : (productIds.length + ' products')}</div>
    </ModalView>
  )
}
