import React from 'react';
import { Form } from 'antd';
import {
  DOMAINS_STATE_LABEL_VALUE_OPTIONS,
} from 'components/contants';
import DropdownSelect from 'components/Common/DropdownSelect';
import InputText from 'components/Common/InputText';

export default function DomainForm({ form, initialValues, ...restProps }) {
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
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please enter name!',
          },
        ]}
      >
        <InputText placeholder="Name"/>
      </Form.Item>
      <Form.Item
        label="Status"
        name="state"
        rules={[
          {
            required: true,
            message: 'Please select status!',
          },
        ]}
      >
        <DropdownSelect
          options={DOMAINS_STATE_LABEL_VALUE_OPTIONS}
        />
      </Form.Item>
    </Form>
  )
}
