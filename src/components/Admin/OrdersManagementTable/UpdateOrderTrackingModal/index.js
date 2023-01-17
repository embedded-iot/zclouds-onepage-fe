import React from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { Form, notification } from 'antd';
import { AdminOrdersService, BaseService } from 'services';
import OrderTrackingForm from './OrderTrackingForm';

export default function UpdateOrderTrackingModal({ open, data, onOk, onCancel }) {
  const [form] = Form.useForm();
  const handleOk = (values) => {
    const shippingEvent = (!!values.shippingEventDescription || values.shippingEventAddress) ? [{
      timestamp: values.shippingEventDate,
      description: values.shippingEventDescription,
      address: values.shippingEventAddress,
    }, ...values.shippingEvent] : values.shippingEvent;
    const trackingData = {
      carrier: values.carrier,
      carrierSup: values.carrierSup,
      shippingStatus: values.shippingStatus,
      trackingNumber: values.trackingNumber,
      costPrice: values.costPrice,
      shippingEvent: JSON.stringify(shippingEvent),
    }
    AdminOrdersService.updateOrderTracking(data.id, trackingData, response => {
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
               width={884}
    >
      <OrderTrackingForm
        form={form}
        initialValues={{ ...(data && data.orderTracking ? data.orderTracking : {}), costPrice: (data && data.costPrice ? data.costPrice : 0) }}
      />
    </ModalView>
  )
}
