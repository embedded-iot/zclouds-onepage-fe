import React from 'react';
import { Form } from 'antd';
import {
  PRODUCER_STATE_LABEL_VALUE_OPTIONS,
} from 'components/contants';
import DropdownSelect from 'components/Common/DropdownSelect';
import InputText from 'components/Common/InputText';

export default function ProducerForm({ form, initialValues, ...restProps }) {
  const producerMessaging = !!initialValues && !!initialValues.producerMessaging ? JSON.parse(initialValues.producerMessaging) : [];
  return (
    <Form
      name="basic"
      form={form}
      autoComplete="off"
      initialValues={{
        status: '',
        messagingApp1: producerMessaging.length > 0 ? producerMessaging[0].messagingApp : '',
        producerMessagingName1: producerMessaging.length > 0 ? producerMessaging[0].producerMessagingName : '',
        messagingApp2: producerMessaging.length > 1 ? producerMessaging[1].messagingApp : '',
        producerMessagingName2: producerMessaging.length > 1 ? producerMessaging[1].producerMessagingName : '',
        ...initialValues,
      }}
      layout="vertical"
      {...restProps}
    >
      <Form.Item
        label="Producer name"
        name="producerName"
        rules={[
          {
            required: true,
            message: 'Please enter producer name!',
          },
        ]}
      >
        <InputText placeholder="Producer name"  />
      </Form.Item>
      <Form.Item
        label="Phone"
        name="producerNumber"
        rules={[
          {
            required: true,
            message: 'Please enter phone!',
          },
        ]}
      >
        <InputText placeholder="Phone" />
      </Form.Item>

      <Form.Item
        label="Email"
        name="producerEmail"
        rules={[
          {
            type: 'email',
            message: 'Email is invalid!',
          },
          {
            required: true,
            message: 'Please enter email!',
          },
        ]}
      >
        <InputText placeholder="Email"/>
      </Form.Item>
      <Form.Item
        label="Address"
        name="producerAddress"
        rules={[
          {
            required: true,
            message: 'Please enter address!',
          },
        ]}
      >
        <InputText placeholder="..."  />
      </Form.Item>
      <Form.Item
        label="Website"
        name="producerWebsite"
        rules={[
          {
            type: 'url',
            message: 'Url invalid!',
          },
        ]}
      >
        <InputText placeholder="..."  />
      </Form.Item>
      <Form.Item
        label="Contact 1"
        name="messagingApp1"
        rules={[
          {
            required: true,
            message: 'Please enter app name!',
          },
        ]}
      >
        <InputText placeholder="App name (e.g: Webchat or Whatsapp....)"  />
      </Form.Item>
      <Form.Item
        name="producerMessagingName1"
        rules={[
          {
            required: true,
            message: 'Please enter contact link or name!',
          },
        ]}
      >
        <InputText placeholder="Profile link or name"  />
      </Form.Item>
      <Form.Item
        label="Contact 2"
        name="messagingApp2"
        rules={[
          {
            required: true,
            message: 'Please enter app name!',
          },
        ]}
      >
        <InputText placeholder="App name (e.g: Webchat or Whatsapp....)"  />
      </Form.Item>
      <Form.Item
        name="producerMessagingName2"
        rules={[
          {
            required: true,
            message: 'Please enter contact link or name!',
          },
        ]}
      >
        <InputText placeholder="Profile link or name"  />
      </Form.Item>
      <Form.Item
        label="ID Card"
        name="producerIdCard"
        rules={[
          {
            required: true,
            message: 'Please enter ID card!',
          },
        ]}
      >
        <InputText placeholder="..."  />
      </Form.Item>
      <Form.Item
        label="Status"
        name="status"
        rules={[
          {
            required: true,
            message: 'Please select status!',
          },
        ]}
      >
        <DropdownSelect
          options={PRODUCER_STATE_LABEL_VALUE_OPTIONS}
        />
      </Form.Item>
    </Form>
  )
}
