import React from 'react';
import { Form } from 'antd';
import InputText from 'components/Common/InputText';
import DropdownSelect from 'components/Common/DropdownSelect';
import { SHIPPING_STATUS_LABEL_VALUE_OPTIONS } from 'components/contants';
import './style.scss';


export default function OrderTrackingForm({ form, initialValues, ...restProps }) {
  const [, ...restShippingStatus] = SHIPPING_STATUS_LABEL_VALUE_OPTIONS;
  const shippingStatusOptions = [
    { label: "Select shipping status", value: '' },
    ...restShippingStatus
  ]
  return (
    <Form
      name="basic"
      form={form}
      autoComplete="off"
      layout="vertical"
      className="import-orders-form__wrapper"
      initialValues={{
        shippingStatus: '',
        ...initialValues,
      }}
      {...restProps}
    >
      <Form.Item
        label="Carrier"
        name="carrier"
        rules={[
          {
            required: true,
            message: 'Please enter category name!',
          },
        ]}
      >
        <InputText placeholder="Carrier" />
      </Form.Item>
      <Form.Item
        label="Carrier Sup"
        name="carrierSup"
        rules={[
          {
            required: true,
            message: 'Please enter category name!',
          },
        ]}
      >
        <InputText placeholder="Carrier Sup" />
      </Form.Item>
      <Form.Item
        label="Shipping Status"
        name="shippingStatus"
        rules={[
          {
            required: true,
            message: 'Please enter category name!',
          },
        ]}
      >
        <DropdownSelect
          options={shippingStatusOptions}
        />
      </Form.Item>
      <Form.Item
        label="Tracking Number"
        name="trackingNumber"
      >
        <InputText placeholder="Tracking Number" />
      </Form.Item>
      <Form.Item
        label="Destination"
        name="destination"
      >
        <InputText placeholder="Destination" />
      </Form.Item>

      <Form.Item
        label="Event"
        name="event"
      >
        <InputText placeholder="Event" />
      </Form.Item>
    </Form>
  )
}
