import React from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { Form, notification } from 'antd';
import BlogCategoriesForm from 'components/Admin/BlogCategoriesManagementTable/AddEditBlogCategoriesModal/BlogCategoriesForm';
import { AdminBlogCategoriesService, BaseService } from 'services';

export default function AddEditBlogCategoriesModal({ open, data, onOk, onCancel }) {
  const [form] = Form.useForm();
  const isEdit = !!data;
  const handleOk = (values) => {
    if (isEdit) {
      AdminBlogCategoriesService.updateBlogCategory(data.id, values, response => {
        notification.success({
          message: "Update blog categories successful!",
        });
        onOk();
      }, error => {
        notification.error({
          message: BaseService.getErrorMessage(error,"Update blog categories failure!" ),
        });
      })
    } else {
      AdminBlogCategoriesService.createBlogCategory(values, response => {
        notification.success({
          message: "Create blog categories successful!",
        });
        onOk();
      }, error => {
        notification.error({
          message: BaseService.getErrorMessage(error, "Create blog categories failure!"),
        });
      })
    }

  }
  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               form={form}
               open={open}
               title={isEdit ? "Edit blog category" : "Add blog category"}
               okText={isEdit ? "Save" : "Add"}
               onOk={handleOk}
               onCancel={onCancel}
    >
      <BlogCategoriesForm
        form={form}
        initialValues={data}
      />
    </ModalView>
  )
}
