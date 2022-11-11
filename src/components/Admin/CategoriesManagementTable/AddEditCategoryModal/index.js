import React from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { Form, notification } from 'antd';
import CategoryForm from './CategoryForm';
import { AdminCategoriesService } from 'services';

export default function AddEditCategoryModal({ open, data, onOk, onCancel }) {
  const [form] = Form.useForm();
  const isEdit = !!data;
  const handleOk = (values) => {
    if (isEdit) {
      AdminCategoriesService.updateCategory(data.id, values, response => {
        notification.success({
          message: "Update category successful!",
        });
        onOk();
      }, error => {
        notification.error({
          message: error && error.title ? error.title : "Update category failure!",
        });
      })
    } else {
      AdminCategoriesService.createCategory(values, response => {
        notification.success({
          message: "Create category successful!",
        });
        onOk();
      }, error => {
        notification.error({
          message: error && error.title ? error.title : "Create category failure!",
        });
      })
    }

  }
  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               form={form}
               open={open}
               title={isEdit ? "Edit category" : "Add category"}
               okText={isEdit ? "Save" : "Add"}
               onOk={handleOk}
               onCancel={onCancel}
    >
      <CategoryForm
        form={form}
        initialValues={data}
      />
    </ModalView>
  )
}
