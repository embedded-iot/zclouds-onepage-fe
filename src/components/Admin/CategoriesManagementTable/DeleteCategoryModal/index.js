import React from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { AdminCategoriesService, BaseService } from 'services';
import { notification } from 'antd';

export default function DeleteCategoryModal({ open, data, onOk, onCancel }) {
  const handleOk = () => {
    AdminCategoriesService.deleteCategory(data.id, response => {
      notification.success({
        message: "Delete category successful!",
      });
      onOk();
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error, "Delete category failure!"),
      });
    })
  }
  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               open={open}
               title={"Delete category"}
               okText={"Delete"}
               onOk={handleOk}
               onCancel={onCancel}
    >
    <div>Delete {data ? data.name : 'Category name'}</div>
    </ModalView>
  )
}
