import React from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { AdminBlogCategoriesService, BaseService } from 'services';
import { notification } from 'antd';

export default function DeleteBlogCategoriesModal({ open, data, onOk, onCancel }) {
  const handleOk = () => {
    AdminBlogCategoriesService.deleteBlogCategory(data.id, response => {
      notification.success({
        message: "Delete blog categories successful!",
      });
      onOk();
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error, "Delete blog categories failure!"),
      });
    })
  }
  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               open={open}
               title={"Delete blog category"}
               okText={"Delete"}
               onOk={handleOk}
               onCancel={onCancel}
    >
    <div>Delete {data ? data.name : 'blog category name'}</div>
    </ModalView>
  )
}
