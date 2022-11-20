import React, { useState } from 'react';
import { Form, notification } from 'antd';
import OrderForm from 'components/Seller/AddEditOrderBox/OrderForm';
import { BaseService, SellerOrdersService } from 'services';

export default function AddEditOrderBox({ data, onOk, onCancel }) {
  const isEdit = !!data;
  const [form] = Form.useForm();

  const handleOk = (values) => {
    const { slug, type } = values;
    const newData = {
      slug, type
    }
    if (isEdit) {
      SellerOrdersService.updateOrder(newData, response => {
        notification.success({
          message: "Update order successful!",
        });
        onOk();
      }, error => {
        notification.error({
          message: BaseService.getErrorMessage(error,"Create order failure!"),
        });
      })
    } else {
      SellerOrdersService.createOrder(newData, response => {
        notification.success({
          message: "Create order successful!",
        });
        onOk();
      }, error => {
        notification.error({
          message: BaseService.getErrorMessage(error,"Create order failure!"),
        });
      })
    }
  }


  return (
    <OrderForm
      form={form}
      initialValues={data}
    />
  )
}
