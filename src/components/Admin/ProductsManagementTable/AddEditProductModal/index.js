import React from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { Form } from 'antd';
import ProductForm from './ProductForm';

export default function AddEditProductModal({ open, data, onOk, onCancel }) {
  const [form] = Form.useForm();
  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               form={form}
               open={open}
               title={data ? "Edit product" : "Add product"}
               okText={data ? "Save" : "Add"}
               onOk={onOk}
               onCancel={onCancel}
    >
      <ProductForm
        form={form}
        initialValues={data}
      />
    </ModalView>
  )
}
