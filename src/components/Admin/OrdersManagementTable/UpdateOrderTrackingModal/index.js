import React from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { Form, notification } from 'antd';
import { AdminOrdersService, BaseService } from 'services';
import OrderTrackingForm from './OrderTrackingForm';

export default function UpdateOrderTrackingModal({ open, data, onOk, onCancel }) {
  const [form] = Form.useForm();
  const handleOk = (values) => {
    AdminOrdersService.updateOrderTracking(data.id, values, response => {
      notification.success({
        message: "Update order tracking successful!",
      });
      onOk();
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error,"Update order tracking failure!"),
      });
    })
  }
  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               form={form}
               open={open}
               title={"Update order tracking"}
               okText={"Save"}
               onOk={handleOk}
               onCancel={onCancel}
    >
      <OrderTrackingForm
        form={form}
        initialValues={data.orderTracking}
      />
    </ModalView>
  )
}
