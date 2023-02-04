import React from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { AdminBlogsService, BaseService } from 'services';
import { notification } from 'antd';

export default function DeleteBlogModal({ open, data, onOk, onCancel }) {
  const handleOk = () => {
    AdminBlogsService.deleteBlog(data.id, response => {
      notification.success({
        message: "Delete blog successful!",
      });
      onOk();
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error, "Delete blog failure!"),
      });
    })
  }
  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               open={open}
               title={"Delete blog"}
               okText={"Delete"}
               onOk={handleOk}
               onCancel={onCancel}
    >
    <div>Delete {data ? data.name : 'Blog name'}</div>
    </ModalView>
  )
}
