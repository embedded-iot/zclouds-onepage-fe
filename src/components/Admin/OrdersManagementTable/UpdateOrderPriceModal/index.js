import React from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { Form, notification } from 'antd';
import OrderPriceForm from './OrderPriceForm';
import { AdminOrdersService, BaseService } from 'services';

export default function UpdateOrderPriceModal({ open, data, onOk, onCancel }) {
  const [form] = Form.useForm();
  const handleOk = (values) => {
    AdminOrdersService.updateOrderPrice(data.id, values, response => {
      notification.success({
        message: "Update order price successful!",
      });
      onOk();
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error,"Update order price failure!" ),
      });
    })
  }
  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               form={form}
               open={open}
               title={"Update order price"}
               okText={"Save"}
               onOk={handleOk}
               onCancel={onCancel}
    >
      <OrderPriceForm
        form={form}
        initialValues={data}
      />
    </ModalView>
  )
}
