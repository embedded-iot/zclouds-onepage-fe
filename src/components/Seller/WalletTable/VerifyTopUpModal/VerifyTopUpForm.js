import React from 'react';
import { Form } from 'antd';
import DropdownSelect from 'components/Common/DropdownSelect';
import InputText from 'components/Common/InputText';
import './style.scss';


export default function VerifyTopUpForm({ form, walletMethodsOptions, ...restProps }) {
  return (
    <Form
      name="basic"
      form={form}
      autoComplete="off"
      layout="vertical"
      initialValues={{
        type: '',
      }}
    >
      <Form.Item
        label="Type"
        name="type"
        rules={[
          {
            required: true,
            message: 'Please select bank type!',
          },
        ]}
      >
        <DropdownSelect options={walletMethodsOptions} />
      </Form.Item>
      <Form.Item
        label="Transaction ID"
        name="transactionId"
        rules={[
          {
            required: true,
            message: 'Please select transaction ID!',
          },
        ]}
      >
        <InputText placeholder="Transaction ID..."/>
      </Form.Item>
      <div className="verify-top-up__note">
        Note: Verify the transaction if your wallet has not been automatically credited
      </div>
    </Form>
  )
}
