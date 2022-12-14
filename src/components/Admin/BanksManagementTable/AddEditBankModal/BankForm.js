import React from 'react';
import { Form } from 'antd';
import {
  BANK_TYPE_LABEL_VALUE_OPTIONS,
} from 'components/contants';
import DropdownSelect from 'components/Common/DropdownSelect';
import InputText from 'components/Common/InputText';

export default function BankForm({ form, initialValues, ...restProps }) {
  return (
    <Form
      name="basic"
      form={form}
      autoComplete="off"
      initialValues={{
        bankType: '',
        ...initialValues,
      }}
      layout="vertical"
      {...restProps}
    >
      <Form.Item
        label="Bank Type"
        name="bankType"
        rules={[
          {
            required: true,
            message: 'Please select bank type!',
          },
        ]}
      >
        <DropdownSelect
          options={BANK_TYPE_LABEL_VALUE_OPTIONS}
        />
      </Form.Item>
      <Form.Item
        label="Bank Name"
        name="bankName"
        rules={[
          {
            required: true,
            message: 'Please enter bank name!',
          },
        ]}
      >
        <InputText placeholder="Bank name"  />
      </Form.Item>
      <Form.Item
        label="Account Name"
        name="bankAccount"
        rules={[
          {
            required: true,
            message: 'Please enter account name!',
          },
        ]}
      >
        <InputText placeholder="Account name"  />
      </Form.Item>
      <Form.Item
        label="Account Number"
        name="bankNumber"
        rules={[
          {
            required: true,
            message: 'Please enter bank number!',
          },
        ]}
      >
        <InputText placeholder="Bank number"  />
      </Form.Item>
      <Form.Item
        label="Transfer Content"
        name="transferContent"
        rules={[
          {
            required: true,
            message: 'Please enter transfer content!',
          },
        ]}
      >
        <InputText placeholder="Transfer content"  />
      </Form.Item>
    </Form>
  )
}
