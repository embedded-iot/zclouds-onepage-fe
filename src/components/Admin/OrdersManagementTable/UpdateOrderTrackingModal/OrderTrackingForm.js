import React from 'react';
import { Col, Form, Row } from 'antd';
import InputText from 'components/Common/InputText';
import DropdownSelect from 'components/Common/DropdownSelect';
import { SHIPPING_STATUS_LABEL_VALUE_OPTIONS } from 'components/contants';
import ShippingEventsTimeLine from 'components/Share/ShippingEventsTimeLine';
import './style.scss';
import { cui } from 'utils';


export default function OrderTrackingForm({ form, initialValues, ...restProps }) {
  const [, ...restShippingStatus] = SHIPPING_STATUS_LABEL_VALUE_OPTIONS;
  const shippingStatusOptions = [
    { label: "Select shipping status", value: '' },
    ...restShippingStatus
  ]
  // eslint-disable-next-line
  const shippingEvents = cui.parseStringObject(initialValues && initialValues.shippingEvent || '[]', []);

  return (
    <Form
      name="basic"
      form={form}
      autoComplete="off"
      layout="vertical"
      className="import-orders-form__wrapper"
      initialValues={{
        shippingStatus: '',
        shippingEventDate: Date.now(),
        shippingEventAddress: '',
        shippingEventDescription: '',
        shippingEvents: shippingEvents,
        ...initialValues,
      }}
      {...restProps}
    >
      <Row gutter={[20, 20]}>
        <Col span={12}>
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
        </Col>
        <Col span={12}>
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
        </Col>
      </Row>
      <Row gutter={[20, 20]}>
        <Col span={12}>
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
        </Col>
        <Col span={12}>
          <Form.Item
            label="Tracking Number"
            name="trackingNumber"
          >
            <InputText placeholder="Tracking Number" />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        label="Destination"
        name="destination"
      >
        <InputText placeholder="Destination" />
      </Form.Item>
      <Form.Item
        label="Shipping Event Date"
        name="shippingEventDate"
        hidden={true}
      >
        <InputText placeholder="Shipping Event Date" />
      </Form.Item>
      <Row gutter={[20, 20]}>
        <Col span={12}>
          <Form.Item
            label="Shipping Event Description (Optional)"
            name="shippingEventDescription"
          >
            <InputText placeholder="Description" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Shipping Event Description (Optional)"
            name="shippingEventAddress"
          >
            <InputText placeholder="Address" />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        label="Shipping Events History"
        name="shippingEvents"
      >
        { !!shippingEvents.length ? <ShippingEventsTimeLine events={shippingEvents} /> : 'No events' }
      </Form.Item>
    </Form>
  )
}
