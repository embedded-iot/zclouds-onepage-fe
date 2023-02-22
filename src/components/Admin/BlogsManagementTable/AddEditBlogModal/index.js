import React, { useEffect, useState } from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { Form, notification } from 'antd';
import BlogForm from './BlogForm';
import { AdminBlogCategoriesService, AdminBlogsService, BaseService } from 'services';
import { getShortPathImage } from 'services/BaseService';

export default function AddEditBlogModal({ open, data, redirectTo, onOk, onCancel }) {
  const [form] = Form.useForm();
  const isEdit = !!data;
  const [blogCategoriesOptions, setBlogCategoriesOptions] = useState([]);

  const handleOk = (values) => {
    const { displayOrder, category, title, description, content, status, imageFiles, blogCategoryId } = values;
    const featureImage = !!imageFiles.length ? imageFiles[0].response.url : null;
    const blogData = {
      displayOrder, category, title, description, content, status, featureImage: getShortPathImage(featureImage), blogCategoryId,
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
  const getBlogCategories = () => {
    AdminBlogCategoriesService.getBlogCategories({ pageNum: 1, pageSize: 100 }, response => {
      setBlogCategoriesOptions(AdminBlogCategoriesService.getBlogCategoriesOptions(response.items));
    }, () => {}, true)
  }

  useEffect(() => {
    getBlogCategories();
  }, []);

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
        blogCategoriesOptions={blogCategoriesOptions}
        redirectTo={redirectTo}
        onCancel={onCancel}
        onFinish={handleOk}
      />
    </ModalView>
  )
}
