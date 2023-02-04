import React from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { Form, notification } from 'antd';
import BlogForm from './BlogForm';
import { AdminBlogsService, BaseService } from 'services';

export default function AddEditBlogModal({ open, data, onOk, onCancel }) {
  const [form] = Form.useForm();
  const isEdit = !!data;
  const handleOk = (values) => {
    const { displayOrder, category, title, description, content, state, imageFiles } = values;
    const featureImage = !!imageFiles.length ? imageFiles[0].response.url : null;
    const blogData = {
      displayOrder, category, title, description, content, state, featureImage
    }
    if (isEdit) {
      AdminBlogsService.updateBlog(data.id, blogData, response => {
        notification.success({
          message: "Update blog successful!",
        });
        onOk();
      }, error => {
        notification.error({
          message: BaseService.getErrorMessage(error,"Update blog failure!" ),
        });
      })
    } else {
      AdminBlogsService.createBlog(blogData, response => {
        notification.success({
          message: "Create blog successful!",
        });
        onOk();
      }, error => {
        notification.error({
          message: BaseService.getErrorMessage(error, "Create blog failure!"),
        });
      })
    }

  }
  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               form={form}
               open={open}
               title={isEdit ? "Edit blog" : "Add blog"}
               footer={null}
    >
      <BlogForm
        form={form}
        isEdit={isEdit}
        initialValues={data}
        onCancel={onCancel}
        onFinish={handleOk}
      />
    </ModalView>
  )
}
