import React from 'react';
import { Form } from 'antd';
import {
  STATE_LABEL_VALUE_OPTIONS,
} from 'components/contants';
import DropdownSelect from 'components/Common/DropdownSelect';
import InputText from 'components/Common/InputText';

export default function ProducerForm({ form, initialValues, ...restProps }) {
  return (
    <Form
      name="basic"
      form={form}
      autoComplete="off"
      initialValues={{
        state: '',
        ...initialValues,
      }}
      layout="vertical"
      {...restProps}
    >
      <Form.Item
        label="Producer name"
        name="name"
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
        name="phone"
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
        name="email"
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
        name="address"
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
        name="website"
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
        label="Contact"
        name="contact"
        rules={[
          {
            required: true,
            message: 'Please enter contact!',
          },
        ]}
      >
        <InputText placeholder="..."  />
      </Form.Item>
      <Form.Item
        label="ID Card"
        name="idCard"
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
        label="State"
        name="state"
        rules={[
          {
            required: true,
            message: 'Please select state!',
          },
        ]}
      >
        <DropdownSelect
          options={STATE_LABEL_VALUE_OPTIONS}
        />
      </Form.Item>
    </Form>
  )
}
