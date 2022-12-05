import React from 'react';
import { Form } from 'antd';
import './style.scss';


export default function CreateNewWalletForm({ form, ...restProps }) {
  return (
    <Form
      name="basic"
      form={form}
      autoComplete="off"
      layout="vertical"
      className="create-new-wallet-form__wrapper"
      {...restProps}
    >
      <Form.Item
        name="key"
        rules={[
          {
            required: true,
            message: 'Please select wallet type!',
          },
        ]}
      >
        {/*<RadioSelect options={SellerWalletsService.getWalletsTypesOptions()} />*/}
      </Form.Item>
    </Form>
  )
}
